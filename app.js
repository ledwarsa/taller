import { createApp, ref, computed, onMounted } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

const App = {
    template: `
        <div class="layout-container">
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
                                        <p class="cart-item-price">{{ item.product.price ? '$' + item.product.price : 'Consultar' }}</p>
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
            <div class="hero-section" v-if="!isCategoryPage">
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


            <transition name="fade" mode="out-in">
                <div class="grid-columns" v-if="!selectedProduct && !isCheckout">
                <div v-for="(col, index) in columns" 
                     :key="col.id"
                     class="column" 
                     :class="['col-' + index, { 'active': activeCol === index }]"
                     :style="{ backgroundImage: 'url(\\'' + col.image + '\\')' }"
                     @mouseenter="activeCol = index"
                     @mouseleave="activeCol = null; activeSubcategory = null">
                     
                    <div class="col-overlay"></div>
                    <div class="col-content">
                        <h2 class="col-title">{{ col.title }}</h2>
                        <a :href="col.category === 'todos' ? 'index.html#full-catalog' : col.category + '.html'" class="hero-collection-btn">
                            VER TODOS LOS PRODUCTOS <i class="fa-solid fa-arrow-right"></i>
                        </a>
                    </div>

                    <!-- Products Modal / Flyout when active -->
                    <div class="products-flyout" :class="{ 'show': activeCol === index }">
                        <div class="category-text-flyout-content" :class="'cat-' + col.category" v-html="getCategoryDescriptionText(col.category)"></div>
                    </div>
                </div>
                </div>
            </transition>

            <transition name="fade">
                <footer class="bottom-bar" v-if="!selectedProduct && !isCheckout">
                <a href="#full-catalog" class="discover-link" @click.prevent="scrollToCatalog">
                    DESCUBRE MÁS <i class="fa-solid fa-chevron-down bounce-arrow"></i>
                </a>
                <div class="center-brand">
                    <img src="./assets/logo.png" alt="Logo Taller de Yako y Lila" class="footer-logo">
                </div>
                <div class="slider-controls">
                    <span class="slide-num">01</span>
                    <div class="progress-bar"><div class="progress-fill" :style="{ width: ((activeCol !== null ? activeCol + 1 : 1) * 20) + '%' }"></div></div>
                    <span class="slide-num">05</span>
                    <button class="nav-btn"><i class="fa-solid fa-chevron-left"></i></button>
                    <button class="nav-btn"><i class="fa-solid fa-chevron-right"></i></button>
                </div>
                </footer>
            </transition>
            </div> <!-- End hero-section -->

            <!-- Global Modals -->
            <transition name="slide-up">
                <div class="product-view-container" v-if="selectedProduct" :style="{ backgroundImage: 'url(\\'' + selectedProduct.column.image + '\\')' }">
                    <div class="product-view-overlay"></div>
                    <button class="btn-close" @click="closeProduct">
                        <i class="fa-solid fa-arrow-left"></i> Volver al catálogo
                    </button>
                    <div class="product-view-content">
                        <div class="product-image-side">
                            <img :src="activeImage || selectedProduct.data.image" :alt="selectedProduct.data.title" class="main-product-image">
                            
                            <!-- Thumbnail Gallery -->
                            <div class="product-gallery" v-if="selectedProduct.data.gallery && selectedProduct.data.gallery.length > 0">
                                <img 
                                    :src="selectedProduct.data.image" 
                                    class="gallery-thumbnail" 
                                    :class="{ 'active': (activeImage || selectedProduct.data.image) === selectedProduct.data.image }"
                                    @click="activeImage = selectedProduct.data.image"
                                >
                                <img 
                                    v-for="img in selectedProduct.data.gallery" 
                                    :key="img" 
                                    :src="img" 
                                    class="gallery-thumbnail"
                                    :class="{ 'active': activeImage === img }"
                                    @click="activeImage = img"
                                >
                            </div>
                        </div>
                        <div class="product-details-side">
                            <div class="glass-panel">
                                <h2>{{ selectedProduct.data.title }}</h2>
                                <p class="product-price">{{ selectedProduct.data.price ? '$' + selectedProduct.data.price : 'Consultar' }}</p>
                                <p class="product-desc" v-if="selectedProduct.data.description" v-html="formatDescription(selectedProduct.data.description)"></p>
                                
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
                                    {{ item.product.price ? '$' + item.product.price : 'Consultar' }}
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

            <!-- Category Split Hero -->
            <section class="category-split-hero" v-if="isCategoryPage && !selectedProduct && !isCheckout">
                <!-- Left Side: Image with slanted cut -->
                <div class="split-hero-left" :style="{ backgroundImage: 'url(./assets/' + isCategoryPage + '_bg.jpg)' }">
                    <div class="split-hero-overlay"></div>
                </div>

                <!-- Right Side: Content -->
                <div class="split-hero-right">
                    <!-- Top Navigation Elements -->
                    <div class="split-hero-nav">
                        <div class="logo-container">
                            <a href="index.html"><img src="./assets/logo.png" alt="Logo" class="hero-logo"></a>
                        </div>
                        <div class="menu-icons" style="display: flex; align-items: center; gap: 20px;">
                            <a href="index.html" class="btn-back-home-small" title="Volver al Inicio">
                                <i class="fa-solid fa-home"></i>
                            </a>
                            <div class="cart-icon-wrapper" @click="isCartOpen = true" style="cursor: pointer; position: relative; color: #1f2937;">
                                <i class="fa-solid fa-shopping-cart"></i>
                                <span class="cart-badge" v-if="cartItemCount > 0">{{ cartItemCount }}</span>
                            </div>
                            <i class="fa-solid fa-bars" @click="isMenuOpen = true" style="cursor: pointer; color: #1f2937;"></i>
                        </div>
                    </div>

                    <!-- Center Content -->
                    <div class="split-hero-content">
                        <div class="split-hero-category-subtitle">
                            <i class="fa-solid fa-gem"></i> EXPLORA LA COLECCIÓN
                        </div>
                        <div class="split-hero-text-card">
                            <h1 class="split-hero-title">{{ categoryTitle }}</h1>
                            <div class="category-text split-text" v-if="categoryDescription" v-html="categoryDescription"></div>
                            
                            <div class="split-hero-actions">
                                <a href="#full-catalog" class="btn-primary-red" @click.prevent="scrollToCatalog">
                                    VER PRODUCTOS
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Full Catalog Section -->
            <section id="full-catalog" class="catalog-section" v-show="!selectedProduct && !isCheckout">
                <aside class="filters-sidebar">
                    <div class="search-container" style="margin-bottom: 30px; position: relative;">
                        <i class="fa-solid fa-search" style="position: absolute; left: 15px; top: 50%; transform: translateY(-50%); color: #9ca3af;"></i>
                        <input type="text" v-model="searchQuery" placeholder="Buscar productos..." class="search-input" style="width: 100%; padding: 12px 15px 12px 40px; border-radius: 8px; border: 1px solid #d1d5db; background-color: white; font-family: var(--font-main); font-size: 1rem; color: #4b5563; outline: none; box-sizing: border-box;">
                    </div>
                        <h3>Categorías</h3>
                        <div class="filter-list">
                            <button class="filter-btn" :class="{ active: activeFilterCategory === 'todos' }" @click="handleCategoryClick('todos')">Todos los Productos</button>
                            <button class="filter-btn" :class="{ active: activeFilterCategory === 'material' }" @click="handleCategoryClick('material')">Material Pedagógico</button>
                            <button class="filter-btn" :class="{ active: activeFilterCategory === 'prendas' }" @click="handleCategoryClick('prendas')">Prendas de Vestir</button>
                            <button class="filter-btn" :class="{ active: activeFilterCategory === 'marca' }" @click="handleCategoryClick('marca')">Productos de Marca</button>
                            <button class="filter-btn" :class="{ active: activeFilterCategory === 'libros' }" @click="handleCategoryClick('libros')">Libros y Cuentos</button>
                            <div>
                                <button class="filter-btn" :class="{ active: ['pijamas', 'Colección Los Pequeños Valientes', 'Colección Libre y Segura'].includes(activeFilterCategory) }" @click="handleCategoryClick('pijamas')" style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                                    Pijamas
                                    <i class="fa-solid" :class="isPijamasOpen ? 'fa-chevron-up' : 'fa-chevron-down'" style="font-size: 0.8rem; opacity: 0.7;"></i>
                                </button>
                                <div v-show="isPijamasOpen" style="display: flex; flex-direction: column; margin-top: 5px; gap: 5px;">
                                    <button class="filter-btn sub-filter" :class="{ active: activeFilterCategory === 'Colección Los Pequeños Valientes' }" @click="handleSubcategoryClick('Colección Los Pequeños Valientes')" style="padding-left: 30px; font-size: 0.9rem;">- Los Pequeños Valientes</button>
                                    <button class="filter-btn sub-filter" :class="{ active: activeFilterCategory === 'Colección Libre y Segura' }" @click="handleSubcategoryClick('Colección Libre y Segura')" style="padding-left: 30px; font-size: 0.9rem;">- Libre y Segura</button>
                                </div>
                            </div>
                        </div>
                    <h3 style="margin-top: 40px;">Precio</h3>
                    <div class="filter-list">
                        <select v-model="activePriceFilter" class="price-select" style="width: 100%; padding: 12px 15px; border-radius: 8px; border: 1px solid #d1d5db; background-color: white; font-family: var(--font-main); font-size: 1rem; font-weight: 600; color: #4b5563; outline: none; cursor: pointer;">
                            <option value="todos">Todos los precios</option>
                            <option value="hasta-50">Hasta $50.000</option>
                            <option value="50-100">$50.000 - $100.000</option>
                            <option value="mas-100">Más de $100.000</option>
                        </select>
                    </div>
                </aside>
                
                <div class="products-grid">
                    <div class="product-card" v-for="product in catalogFilteredProducts" :key="product.title" @click="selectProduct(product, { category: product.category, image: './assets/todos_bg2.jpg' })">
                        <img :src="product.image" :alt="product.title" loading="lazy">
                        <h3>{{ product.title }}</h3>
                        <p class="price" v-if="product.price !== '0'">{{ product.price ? '$' + product.price : 'Consultar' }}</p>
                        <button class="btn-buy">VER MÁS</button>
                    </div>
                    <div class="no-products" v-if="catalogFilteredProducts.length === 0">
                        Próximamente (Categoría: {{ activeFilterCategory }}, Total: {{ products ? products.length : 0 }})
                    </div>
                </div>
            </section>

            <!-- Main Global Footer -->
            <footer class="global-footer" v-show="!selectedProduct && !isCheckout">
                <div class="footer-content">
                    <img src="./assets/logo-site-blanco.png" alt="Fundación Red" class="footer-main-logo">
                    
                    <div class="footer-info">
                        <p><strong>Dirección:</strong> Calle 127B # 50A-01 Tierra Linda.</p>
                        <p><strong>Celular:</strong> +57 318 6266792</p>
                        <p><strong>Correo:</strong> contactenos@redcontraelabusosexual.org</p>
                        <p><a href="https://redcontraelabusosexual.org/politica-de-proteccion-de-datos/" target="_blank" class="footer-policy">Política de Protección de datos</a></p>
                    </div>
                </div>
                
                <div class="footer-bottom-bar">
                    <p>© Fundación Red Todos los derechos reservados 2026 | Diseñado IconoVirtual</p>
                </div>

                <a href="https://redcontraelabusosexual.org/donaciones/" target="_blank" class="floating-donate">
                    <img src="./assets/BOTON-DONACIONES.png" alt="Donar Ahora">
                </a>
                
                <a href="http://wa.link/hvynr5" target="_blank" class="floating-whatsapp">
                    <i class="fa-brands fa-whatsapp"></i>
                </a>
            </footer>
        </div>
    `,
    setup() {
        const columns = ref([
            { id: 1, title: 'Material Pedagógico', category: 'material', image: './assets/material_bg.jpg' },
            { id: 2, title: 'Prendas de Vestir', category: 'prendas', image: './assets/prendas_bg.jpg' },
            { id: 3, title: 'Productos de Marca', category: 'marca', image: './assets/marca_bg.jpg' },
            { id: 4, title: 'Pijamas', category: 'pijamas', image: './assets/Gemini_Generated_Image_li9jjvli9jjvli9j.jpg' },
            { id: 5, title: 'Libros y Cuentos', category: 'libros', image: './assets/todos_bg2.jpg' }
        ]);

        const activeCol = ref(null);
        const activeSubcategory = ref(null);
        const products = ref([]);
        const selectedProduct = ref(null);
        const activeImage = ref('');
        const selectedOptions = ref({});
        const isMenuOpen = ref(false);
        const isCartOpen = ref(false);
        const isCheckout = ref(false);
        const cart = ref([]);
        const isCategoryPage = window.categoryPage || null;
        const activeFilterCategory = ref(isCategoryPage || 'todos');
        const activePriceFilter = ref('todos');
        const isPijamasOpen = ref(false);
        const searchQuery = ref('');

        const categoryTitle = computed(() => {
            if (!isCategoryPage) return '';
            const titles = {
                'material': 'Material Pedagógico',
                'prendas': 'Prendas de Vestir',
                'marca': 'Productos de Marca',
                'pijamas': 'Pijamas',
                'libros': 'Libros y Cuentos'
            };
            return titles[isCategoryPage] || '';
        });

        const getCategoryDescriptionText = (category) => {
            const descriptions = {
                'material': '<p>Yako y Lila, los dos personajes principales de nuestro cuento “Los Pequeños Valientes”, ¡han creado su propio taller de herramientas! Aquí, ellos han diseñado diferentes juegos y herramientas pedagógicas que ayudarán a otros niños, niñas y adolescentes (NNA) a prevenir, detectar y denunciar el abuso sexual infantil (ASI).</p><p>Estas herramientas están diseñadas para usarse bajo la supervisión y guía de los adultos responsables, es decir, los papás y las mamás, para que todos puedan aprender en familia de forma divertida.</p>',
                'prendas': '<p>En la Fundación Red, sabemos que los niños, niñas y adolescentes (NNA) necesitan herramientas divertidas y útiles para aprender.</p><p>Por eso, con la creación de hoodies y camisetas, tenemos una herramienta de comunicación visual al mismo tiempo que plasmamos un mensaje contundente: la prevención comienza desde la protección del espacio personal.</p>',
                'marca': '<p>Con estos productos queremos estar presentes y acompañarte en tu día a dia. Cuando te tomes un café o quieras escribir tus pensamientos e ideas inspiradoras...</p><p>Yako, Lila, o Lisi te recordarán la importancia de ser valientes con nuestros mugs y lapiceros que representan nuestro compromiso a cuidar a los niños, niñas y adolescentes.</p>',
                'pijamas': '<p>En esta campaña las pijamas simbolizan un escudo protector. La pijama es diseñada tipo onesie, o en otras palabras, una sola pieza o enterizo.</p><p>De esta manera, creamos una analogía donde la protección hacia el cuerpo debe ser total, así como el espacio físico que cubre la prenda, es decir, el cuerpo entero. Constituye un símbolo de empoderamiento a través del mensaje de autoprotección y autocuidado que lleva.</p>',
                'libros': '<p>Desde hace más de 20 años, hemos creado diferentes formas/estrategias para que los niños y las niñas aprendan a protegerse del abuso sexual infantil (ASI). Entre cuentos y juegos infantiles, tenemos para ustedes una variedad de herramientas pedagógicas para que puedan enseñar a sus hijos con facilidad este tema.</p><p>Como Yako y Lila saben, que la educación en prevención de ASI no es únicamente de los niños, sino también de los adultos -pues saben que los papás y las mamás también necesitan ayuda para abordar este tema con sus hijos-, disponen en su taller de herramientas para ellos como los libros “Lo que Debes Saber del Abuso Sexual Infantil”, y “Los Niños del Viento”.</p><p>Estas herramientas son ideales para los docentes en los colegios, los padres de familia y en general quienes tengan a su cuidado menores de edad.</p>',
                'todos': '<p>Explora todo nuestro catálogo de productos con un propósito. Desde material pedagógico hasta prendas de vestir que llevan nuestro mensaje de prevención.</p>'
            };
            return descriptions[category] || '';
        };

        const categoryDescription = computed(() => {
            if (!isCategoryPage) return '';
            return getCategoryDescriptionText(isCategoryPage);
        });

        const handleCategoryClick = (cat) => {
            if (isCategoryPage) {
                if (cat === 'todos') window.location.href = 'index.html#full-catalog';
                else window.location.href = cat + '.html';
            } else {
                activeFilterCategory.value = cat;
                if (cat === 'pijamas') isPijamasOpen.value = !isPijamasOpen.value;
            }
        };

        const handleSubcategoryClick = (subcat) => {
            if (isCategoryPage && isCategoryPage !== 'pijamas') {
                window.location.href = 'pijamas.html?subcat=' + encodeURIComponent(subcat);
            } else {
                activeFilterCategory.value = subcat;
            }
        };

        const navigateToCategory = (cat) => {
            if (cat === 'todos') window.location.href = 'index.html#full-catalog';
            else window.location.href = cat + '.html';
        };

        if (isCategoryPage === 'pijamas') {
            const urlParams = new URLSearchParams(window.location.search);
            const subcat = urlParams.get('subcat');
            if (subcat) {
                activeFilterCategory.value = subcat;
                isPijamasOpen.value = true;
            }
        }

        const cartTotal = computed(() => {
            return cart.value.reduce((total, item) => {
                const priceStr = item.product.price || "0";
                const price = parseFloat(priceStr.replace(/\./g, ''));
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
            
            // Highlight existing keywords
            formatted = formatted.replace(/(Población:)/gi, '<br><br><strong>$1</strong>');
            formatted = formatted.replace(/(Objetivo:)/gi, '<br><br><strong>$1</strong>');
            
            // Highlight Pijamas keywords
            formatted = formatted.replace(/(Tipo:)/gi, '<br><br><strong>$1</strong>');
            formatted = formatted.replace(/(Tallas disponibles:)/gi, '<br><strong>$1</strong>');
            formatted = formatted.replace(/(Color:)/gi, '<br><strong>$1</strong>');
            formatted = formatted.replace(/(Características:)/gi, '<br><br><strong>$1</strong>');
            formatted = formatted.replace(/(Composición de la tela:)/gi, '<br><br><strong>$1</strong>');
            formatted = formatted.replace(/(Estas pijamas incluyen)/gi, '<br><br><strong>$1</strong>');
            formatted = formatted.replace(/(Si la compra de la pijama se realiza desde el exterior)/gi, '<br><br><em>$1</em>');
            
            // Remove leading brs if any
            formatted = formatted.replace(/^(<br\s*\/?>)+/i, '');
            
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
                const res = await fetch('./productos.json?t=' + Date.now());
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
            
            ['material', 'prendas', 'marca', 'pijamas', 'libros', 'todos'].forEach(cat => {
                let result = [];
                if (cat === 'todos') {
                    result = [...products.value];
                } else {
                    result = products.value.filter(p => {
                        if (Array.isArray(p.category)) {
                            return p.category.includes(cat);
                        }
                        return p.category === cat;
                    });
                    if (result.length === 0) {
                        result = products.value.filter(p => {
                            const title = p.title.toLowerCase();
                            if (cat === 'material') return title.includes('combo') || title.includes('kit') || title.includes('rompecabezas') || title.includes('láminas') || title.includes('cuento') || title.includes('libro') || title.includes('ebook') || title.includes('dominó') || title.includes('lotería') || title.includes('abanico');
                            if (cat === 'prendas') return title.includes('hoodie') || title.includes('pijama');
                            if (cat === 'marca') return title.includes('mug') || title.includes('vaso');
                            if (cat === 'libros') return title.includes('cuento') || title.includes('libro') || title.includes('ebook');
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
            if (col.category === 'pijamas' && product.price === '0') {
                activeSubcategory.value = product.title;
                return;
            }
            selectedProduct.value = { data: product, column: col };
            activeImage.value = product.image;
            selectedOptions.value = {};          // Initialize default selections (first option of each)
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
                text += ` - ${item.product.price ? '$' + item.product.price : 'Consultar'}\n`;
            });
            text += `\n*Total: $${cartTotal.value}*`;
            
            const encodedText = encodeURIComponent(text);
            const phoneNumber = "573186266792";
            window.open(`https://wa.me/${phoneNumber}?text=${encodedText}`, '_blank');
        };

        const scrollToCatalog = () => {
            const el = document.getElementById('full-catalog');
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
            }
        };

        const catalogFilteredProducts = computed(() => {
            let list = [];
            if (activeFilterCategory.value === 'Colección Los Pequeños Valientes' || activeFilterCategory.value === 'Colección Libre y Segura') {
                list = products.value.filter(p => p.subcategory === activeFilterCategory.value);
            } else {
                list = categoryProductsList.value[activeFilterCategory.value] || [];
            }
            
            // Filter out subcategory headers
            list = list.filter(p => p.price !== '0');

            // Filter by price
            if (activePriceFilter.value !== 'todos') {
                list = list.filter(p => {
                    if (!p.price) return true; // Show items without price
                    const priceNum = parseFloat(p.price.replace(/\./g, ''));
                    if (activePriceFilter.value === 'hasta-50') return priceNum <= 50000;
                    if (activePriceFilter.value === '50-100') return priceNum > 50000 && priceNum <= 100000;
                    if (activePriceFilter.value === 'mas-100') return priceNum > 100000;
                    return true;
                });
            }

            // Filter by search query
            if (searchQuery.value.trim() !== '') {
                const query = searchQuery.value.toLowerCase();
                list = list.filter(p => p.title.toLowerCase().includes(query) || (p.description && p.description.toLowerCase().includes(query)));
            }

            // Remove subcategory header items (price '0') from the grid
            return list.filter(p => p.price !== '0');
        });

        return {
            columns,
            activeCol,
            activeSubcategory,
            products,
            categoryProductsList,
            selectedProduct,
            activeImage,
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
            payWithWhatsapp,
            activeFilterCategory,
            activePriceFilter,
            isPijamasOpen,
            searchQuery,
            catalogFilteredProducts,
            scrollToCatalog,
            isCategoryPage,
            categoryTitle,
            categoryDescription,
            getCategoryDescriptionText,
            handleCategoryClick,
            handleSubcategoryClick,
            navigateToCategory
        };
    }
};

createApp(App).mount('#app');
