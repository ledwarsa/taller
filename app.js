import { createApp, ref, computed, onMounted } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

const App = {
    template: `
        <div class="layout-container">
            <header class="header">
                <div class="logo-container">
                    <!-- Logo moved to bottom bar -->
                </div>
                <div class="menu-icons">
                    <i class="fa-solid fa-shopping-cart"></i>
                    <i class="fa-solid fa-bars"></i>
                </div>
            </header>

            <transition name="fade" mode="out-in">
                <div class="grid-columns" v-if="!selectedProduct">
                <div v-for="(col, index) in columns" 
                     :key="col.id"
                     class="column" 
                     :class="['col-' + index, { 'active': activeCol === index }]"
                     :style="{ backgroundImage: 'url(\\'' + col.image + '\\')' }"
                     @mouseenter="activeCol = index"
                     @mouseleave="activeCol = null">
                     
                    <div class="col-overlay"></div>
                    <div class="col-content">
                        <h2 class="col-title">{{ col.title }}</h2>
                    </div>

                    <!-- Products Modal / Flyout when active -->
                    <div class="products-flyout" :class="{ 'show': activeCol === index }">
                        <div class="products-scroll" 
                             :ref="el => { if (el) scrollRefs[index] = el }" 
                             @mouseenter="pauseScroll" 
                             @mouseleave="resumeScroll"
                             @wheel.prevent="handleWheel"
                             @touchstart="pauseScroll"
                             @touchend="resumeScroll">
                            <div class="product-card" v-for="product in (categoryProductsList[col.category] || [])" :key="product.title" @click="selectProduct(product, col)">
                                <img :src="product.image" :alt="product.title" loading="lazy">
                                <h3>{{ product.title }}</h3>
                                <p class="price">\${{ product.price }}</p>
                                <button class="btn-buy">VER MÁS</button>
                            </div>
                            <div class="no-products" v-if="(categoryProductsList[col.category] || []).length === 0">
                                Próximamente
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </transition>

            <transition name="slide-up">
                <div class="product-view-container" v-if="selectedProduct" :style="{ backgroundImage: 'url(\\'' + selectedProduct.column.image + '\\')' }">
                    <div class="product-view-overlay"></div>
                    <button class="btn-close" @click="closeProduct">
                        <i class="fa-solid fa-arrow-left"></i> Volver al catálogo
                    </button>
                    <div class="product-view-content">
                        <div class="product-image-side">
                            <img :src="selectedProduct.data.image" :alt="selectedProduct.data.title">
                        </div>
                        <div class="product-details-side">
                            <div class="glass-panel">
                                <h2>{{ selectedProduct.data.title }}</h2>
                                <p class="product-price">\${{ selectedProduct.data.price }}</p>
                                <p class="product-desc" v-html="formatDescription(selectedProduct.data.description)"></p>
                                
                                <div v-if="selectedProduct.data.options && selectedProduct.data.options.length > 0" class="product-options" style="margin-bottom: 25px;">
                                    <div v-for="opt in selectedProduct.data.options" :key="opt.name" style="margin-bottom: 20px;">
                                        <label style="display: block; font-weight: bold; margin-bottom: 8px; opacity: 0.9;">{{ opt.name }}:</label>
                                        <div class="options-container">
                                            <button 
                                                v-for="choice in opt.choices" 
                                                :key="choice" 
                                                class="option-btn" 
                                                :class="{ 'active': selectedOptions[opt.name] === choice }"
                                                @click="selectedOptions[opt.name] = choice"
                                            >
                                                {{ choice }}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div class="product-actions">
                                    <button class="btn-buy-large" @click="buyProduct">🛒 COMPRAR AHORA</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>

            <transition name="fade">
                <footer class="bottom-bar" v-if="!selectedProduct">
                <a href="#" class="discover-link">DESCUBRE MÁS</a>
                <div class="center-brand">
                    <img src="./assets/logo.png" alt="Logo Taller de Yako y Lila" class="footer-logo">
                </div>
                <div class="slider-controls">
                    <span class="slide-num">01</span>
                    <div class="progress-bar"><div class="progress-fill" :style="{ width: ((activeCol !== null ? activeCol + 1 : 1) * 25) + '%' }"></div></div>
                    <span class="slide-num">04</span>
                    <button class="nav-btn"><i class="fa-solid fa-chevron-left"></i></button>
                    <button class="nav-btn"><i class="fa-solid fa-chevron-right"></i></button>
                </div>
                </footer>
            </transition>
        </div>
    `,
    setup() {
        const columns = ref([
            { id: 1, title: 'Material Pedagógico', category: 'material', image: './assets/material_bg.jpg' },
            { id: 2, title: 'Prendas de Vestir', category: 'prendas', image: './assets/prendas_bg.jpg' },
            { id: 3, title: 'Productos de Marca', category: 'marca', image: './assets/marca_bg.jpg' },
            { id: 4, title: 'Todos los Productos', category: 'todos', image: './assets/todos_bg2.jpg' }
        ]);

        const activeCol = ref(null);
        const products = ref([]);
        const selectedProduct = ref(null);
        const selectedOptions = ref({});

        // Auto-scroll logic
        const scrollRefs = ref([]);
        const isHovered = ref(false);
        let animationFrame = null;

        const pauseScroll = () => { isHovered.value = true; };
        const resumeScroll = () => { isHovered.value = false; };

        const formatDescription = (desc) => {
            if (!desc) return 'Descripción no disponible.';
            let formatted = desc.replace(/^(Descripción|Producto):\s*/i, '').trim();
            formatted = formatted.replace(/(Población:)/gi, '<strong>$1</strong>');
            formatted = formatted.replace(/(Objetivo:)/gi, '<strong>$1</strong>');
            return formatted;
        };

        const filteredProducts = computed(() => {
            if (activeCol.value === null) return [];
            const col = columns.value[activeCol.value];
            
            let result = [];
            if (col.category === 'todos') {
                result = [...products.value];
            } else {
                result = products.value.filter(p => p.category === col.category);
            }

            // Sort logic: Ebooks, Libros and Cuentos first
            result.sort((a, b) => {
                const isBookA = /ebook|libro|cuento/i.test(a.title);
                const isBookB = /ebook|libro|cuento/i.test(b.title);
                if (isBookA && !isBookB) return -1;
                if (!isBookA && isBookB) return 1;
                return 0;
            });

            return result;
        });

        const autoScroll = () => {
            if (!isHovered.value && activeCol.value !== null) {
                const container = scrollRefs.value[activeCol.value];
                if (container) {
                    container.scrollLeft += 0.5; // Auto-scroll speed
                    if (container.scrollLeft >= (container.scrollWidth - container.clientWidth - 1)) {
                        container.scrollLeft = 0; // Loop back
                    }
                }
            }
            animationFrame = requestAnimationFrame(autoScroll);
        };

        const handleWheel = (event) => {
            if (activeCol.value !== null) {
                const container = scrollRefs.value[activeCol.value];
                if (container) {
                    // Translate vertical mouse wheel (deltaY) and horizontal trackpad (deltaX) to scrollLeft
                    container.scrollLeft += (event.deltaY || 0) + (event.deltaX || 0);
                }
            }
        };

        onMounted(async () => {
            try {
                const res = await fetch('./productos.json');
                const data = await res.json();
                products.value = data;
                
                // Start auto-scroll
                animationFrame = requestAnimationFrame(autoScroll);
            } catch (err) {
                console.error("Error loading products:", err);
            }
        });

        const categoryProductsList = computed(() => {
            const lists = {};
            if (!products.value) return lists;
            
            ['material', 'prendas', 'marca', 'todos'].forEach(cat => {
                let result = [];
                if (cat === 'todos') {
                    result = [...products.value];
                } else {
                    result = products.value.filter(p => p.category === cat);
                    if (result.length === 0) {
                        result = products.value.filter(p => {
                            const title = p.title.toLowerCase();
                            if (cat === 'material') return title.includes('combo') || title.includes('kit') || title.includes('rompecabezas') || title.includes('láminas') || title.includes('cuento') || title.includes('libro') || title.includes('ebook') || title.includes('dominó') || title.includes('lotería') || title.includes('abanico');
                            if (cat === 'prendas') return title.includes('hoodie') || title.includes('pijama');
                            if (cat === 'marca') return title.includes('mug') || title.includes('vaso');
                            return false;
                        });
                    }
                }
                
                result.sort((a, b) => {
                    const isBookA = /ebook|libro|cuento/i.test(a.title);
                    const isBookB = /ebook|libro|cuento/i.test(b.title);
                    if (cat === 'todos') {
                        if (isBookA && !isBookB) return -1;
                        if (!isBookA && isBookB) return 1;
                    } else if (cat === 'material') {
                        if (isBookA && !isBookB) return 1;
                        if (!isBookA && isBookB) return -1;
                    }
                    return 0;
                });
                
                lists[cat] = result;
            });
            
            return lists;
        });

        const selectProduct = (product, col) => {
            selectedProduct.value = { data: product, column: col };
            
            // Initialize default selections (first option of each)
            const initialOpts = {};
            if (product.options) {
                product.options.forEach(opt => {
                    initialOpts[opt.name] = opt.choices[0];
                });
            }
            selectedOptions.value = initialOpts;
            
            pauseScroll();
        }; 

        const closeProduct = () => {
            selectedProduct.value = null;
        };

        const buyProduct = () => {
            alert('¡Producto añadido al carrito correctamente!');
        };

        return {
            columns,
            activeCol,
            products,
            categoryProductsList,
            selectedProduct,
            selectProduct,
            closeProduct,
            buyProduct,
            scrollRefs,
            pauseScroll,
            resumeScroll,
            handleWheel,
            formatDescription,
            selectedOptions
        };
    }
};

createApp(App).mount('#app');
