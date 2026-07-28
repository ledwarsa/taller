import { createApp, ref, computed, onMounted } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

const App = {
    template: `
        <div class="layout-container">
            <header class="header">
                <div class="logo-container">
                    <!-- Logo moved to bottom bar -->
                </div>
                <div class="menu-icons">
                    <div class="cart-icon-wrapper" @click="isCartOpen = true">
                        <i class="fa-solid fa-shopping-cart"></i>
                        <span class="cart-badge" v-if="cartItemCount > 0">{{ cartItemCount }}</span>
                    </div>
                    <i class="fa-solid fa-bars" @click="isMenuOpen = true"></i>
                </div>
            </header>

            <transition name="slide-right">
                <div class="side-cart" v-if="isCartOpen">
                    <div class="menu-overlay" @click="isCartOpen = false"></div>
                    <div class="menu-content cart-content-panel">
                        <button class="btn-close-menu" @click="isCartOpen = false">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                        <h2 class="cart-title">Tu Carrito</h2>
                        
                        <div v-if="cart.length === 0" class="empty-cart">
                            <i class="fa-solid fa-cart-shopping"></i>
                            <p>Tu carrito está vacío</p>
                        </div>
                        
                        <div v-else class="cart-items-container">
                            <div class="cart-scroll-area">
                                <div v-for="(item, index) in cart" :key="index" class="cart-item">
                                    <img :src="item.product.image" class="cart-item-img">
                                    <div class="cart-item-details">
                                        <h4>{{ item.product.title }}</h4>
                                        <p class="cart-item-price">\${{ item.product.price }}</p>
                                        <div class="cart-item-options" v-if="Object.keys(item.options).length">
                                            <span v-for="(val, key) in item.options" :key="key">{{key}}: {{val}}</span>
                                        </div>
                                        <div class="cart-qty">
                                            <button @click="item.quantity > 1 ? item.quantity-- : removeFromCart(index)">-</button>
                                            <span>{{ item.quantity }}</span>
                                            <button @click="item.quantity++">+</button>
                                        </div>
                                    </div>
                                    <button class="btn-remove-item" @click="removeFromCart(index)">
                                        <i class="fa-solid fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="cart-footer">
                                <h3>Total: \${{ cartTotal }}</h3>
                                <button class="btn-checkout" @click="goToCheckout">FINALIZAR COMPRA</button>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>

            <transition name="slide-right">
                <div class="side-menu" v-if="isMenuOpen">
                    <div class="menu-overlay" @click="isMenuOpen = false"></div>
                    <div class="menu-content">
                        <button class="btn-close-menu" @click="isMenuOpen = false">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                        <nav class="menu-nav">
                            <a href="https://redcontraelabusosexual.org/" target="_blank">INICIO</a>
                            
                            <details>
                                <summary>NOSOTROS <i class="fa-solid fa-chevron-down"></i></summary>
                                <div class="sub-menu">
                                    <a href="https://redcontraelabusosexual.org/nosotros/alexandra-moreno-piraquive/" target="_blank">Alexandra Moreno Piraquive</a>
                                    <a href="https://redcontraelabusosexual.org/nosotros/lisa-marie-wills-moreno/" target="_blank">Lisa Marie Wills Moreno</a>
                                </div>
                            </details>

                            <details>
                                <summary>LÍNEAS DE ACCIÓN <i class="fa-solid fa-chevron-down"></i></summary>
                                <div class="sub-menu">
                                    <details>
                                        <summary>Tu Defensa es Tu Voz <i class="fa-solid fa-chevron-down"></i></summary>
                                        <div class="sub-menu">
                                            <a href="https://redcontraelabusosexual.org/definiciones/" target="_blank">Definiciones</a>
                                            <a href="https://redcontraelabusosexual.org/normatividad/" target="_blank">Normatividad</a>
                                            <a href="https://redcontraelabusosexual.org/blog/" target="_blank">Blog</a>
                                        </div>
                                    </details>
                                    <details>
                                        <summary>Formación y Acción <i class="fa-solid fa-chevron-down"></i></summary>
                                        <div class="sub-menu">
                                            <a href="https://redcontraelabusosexual.org/gestion-social/" target="_blank">Gestión Social</a>
                                            <a href="https://redcontraelabusosexual.org/talleres/" target="_blank">Solicitar un taller</a>
                                        </div>
                                    </details>
                                    <details>
                                        <summary>Lúdica y Confianza <i class="fa-solid fa-chevron-down"></i></summary>
                                        <div class="sub-menu">
                                            <a href="https://redcontraelabusosexual.org/ludica-y-confianza/" target="_blank">Material pedagógico</a>
                                            <a href="https://redcontraelabusosexual.org/taller-de-yako-y-lila/" target="_blank">Taller de Yako y Lila</a>
                                            <details>
                                                <summary>Shows <i class="fa-solid fa-chevron-down"></i></summary>
                                                <div class="sub-menu">
                                                    <a href="https://redcontraelabusosexual.org/los-pequenos-valientes/" target="_blank">Los Pequeños Valientes</a>
                                                    <a href="https://redcontraelabusosexual.org/lisi-y-los-pequenos-valientes-por-colombia/" target="_blank">Lisi por Colombia</a>
                                                </div>
                                            </details>
                                        </div>
                                    </details>
                                    <details>
                                        <summary>Mi Pijama Mi Escudo <i class="fa-solid fa-chevron-down"></i></summary>
                                        <div class="sub-menu">
                                            <a href="https://redcontraelabusosexual.org/mi-pijama-mi-escudo/" target="_blank">Proyecto</a>
                                        </div>
                                    </details>
                                    <details>
                                        <summary>Gestión en red <i class="fa-solid fa-chevron-down"></i></summary>
                                        <div class="sub-menu">
                                            <a href="https://redcontraelabusosexual.org/donaciones/" target="_blank">Donaciones</a>
                                            <a href="https://redcontraelabusosexual.org/entrega-de-gafas/" target="_blank">Campaña Cuidamos tu mirada y tu corazón</a>
                                            <a href="https://redcontraelabusosexual.org/solidaridad-ante-el-covid-19/" target="_blank">Solidaridad ante el Covid-19</a>
                                            <a href="https://redcontraelabusosexual.org/voluntariado/" target="_blank">Voluntariado</a>
                                        </div>
                                    </details>
                                </div>
                            </details>

                            <details>
                                <summary>CLUB EVA <i class="fa-solid fa-chevron-down"></i></summary>
                                <div class="sub-menu">
                                    <a href="http://campus.fundacionred.org/my/courses.php" target="_blank">Campus EVA</a>
                                    <a href="https://evaemprendedora.fundacionred.org/" target="_blank">EVA Emprendedora</a>
                                </div>
                            </details>

                            <a href="https://redcontraelabusosexual.org/taller-de-yako-y-lila/" target="_blank">TALLER DE YAKO Y LILA</a>
                            <a href="https://redcontraelabusosexual.org/contacto/" target="_blank">CONTÁCTENOS</a>
                        </nav>
                    </div>
                </div>
            </transition>

            <transition name="fade" mode="out-in">
                <div class="grid-columns" v-if="!selectedProduct && !isCheckout">
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
                                    <button class="btn-buy-large" @click="buyProduct">🛒 AÑADIR AL CARRITO</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>

            <transition name="fade">
                <div class="checkout-container" v-if="isCheckout">
                    <button class="btn-close" @click="closeCheckout">
                        <i class="fa-solid fa-arrow-left"></i> Seguir comprando
                    </button>
                    <div class="checkout-content">
                        <h2>Resumen de tu pedido</h2>
                        
                        <div class="checkout-items">
                            <div v-for="(item, index) in cart" :key="index" class="checkout-item">
                                <img :src="item.product.image" class="checkout-item-img">
                                <div class="checkout-item-details">
                                    <h4>{{ item.product.title }}</h4>
                                    <div v-if="Object.keys(item.options).length">
                                        <span v-for="(val, key) in item.options" :key="key">{{key}}: {{val}} </span>
                                    </div>
                                </div>
                                <div class="checkout-item-qty">
                                    x{{ item.quantity }}
                                </div>
                                <div class="checkout-item-price">
                                    \${{ item.product.price }}
                                </div>
                            </div>
                        </div>
                        
                        <div class="checkout-total">
                            Total a pagar: <span>\${{ cartTotal }}</span>
                        </div>
                        
                        <button class="btn-whatsapp" @click="payWithWhatsapp">
                            <i class="fa-brands fa-whatsapp"></i> PAGAR POR WHATSAPP
                        </button>
                    </div>
                </div>
            </transition>

            <transition name="fade">
                <footer class="bottom-bar" v-if="!selectedProduct && !isCheckout">
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
        const isMenuOpen = ref(false);
        const isCartOpen = ref(false);
        const isCheckout = ref(false);
        const cart = ref([]);

        const cartTotal = computed(() => {
            return cart.value.reduce((total, item) => {
                const price = parseFloat(item.product.price.replace(/\./g, ''));
                return total + (price * item.quantity);
            }, 0).toLocaleString('es-CO');
        });

        const cartItemCount = computed(() => {
            return cart.value.reduce((count, item) => count + item.quantity, 0);
        });

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
            const product = selectedProduct.value.data;
            const options = { ...selectedOptions.value };
            
            const existingItem = cart.value.find(item => 
                item.product.title === product.title && 
                JSON.stringify(item.options) === JSON.stringify(options)
            );

            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.value.push({
                    product: product,
                    options: options,
                    quantity: 1
                });
            }
            
            selectedProduct.value = null;
            isCartOpen.value = true;
        };

        const removeFromCart = (index) => {
            cart.value.splice(index, 1);
        };

        const goToCheckout = () => {
            isCartOpen.value = false;
            isCheckout.value = true;
        };

        const closeCheckout = () => {
            isCheckout.value = false;
        };

        const payWithWhatsapp = () => {
            let text = "Hola, me gustaría comprar lo siguiente:\n\n";
            cart.value.forEach(item => {
                text += `- ${item.quantity}x ${item.product.title}`;
                if (Object.keys(item.options).length > 0) {
                    const opts = Object.entries(item.options).map(([k, v]) => `${k}: ${v}`).join(', ');
                    text += ` (${opts})`;
                }
                text += ` - $${item.product.price}\n`;
            });
            text += `\n*Total: $${cartTotal.value}*`;
            
            const encodedText = encodeURIComponent(text);
            const phoneNumber = "573186266792";
            window.open(`https://wa.me/${phoneNumber}?text=${encodedText}`, '_blank');
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
            selectedOptions,
            isMenuOpen,
            isCartOpen,
            cart,
            cartTotal,
            cartItemCount,
            removeFromCart,
            isCheckout,
            goToCheckout,
            closeCheckout,
            payWithWhatsapp
        };
    }
};

createApp(App).mount('#app');
