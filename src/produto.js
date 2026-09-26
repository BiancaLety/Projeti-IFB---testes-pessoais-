const PRODUCT_API_BASE_URL = "";
const WHATSAPP_NUMBER = "5561982008929";

const fallbackProducts = [
    { id: "redmi-note-14", name: "Xiaomi Redmi Note 14", brand: "Xiaomi", category: "Smartphones", image: "https://dcdn-us.mitiendanube.com/stores/005/007/743/products/1000673596-8eb3b4a8bb7d1b5c8f17365466335074-1024-1024.jpg", model: "Redmi Note 14", summary: "Conheça os recursos e consulte a disponibilidade do Xiaomi Redmi Note 14.", color: "Preto" },
    { id: "ps5-slim", name: "PS5 Slim Mídia Digital/Física", brand: "Sony", category: "Vídeo Games", image: "img/ps5.jpg", images: ["img/ps5.jpg", "https://http2.mlstatic.com/D_NQ_NP_756435-MLA95500672926_102025-O.webp"], model: "CFI 2114B", edition: "Digital", storage: "825 GB SSD", summary: "Faça agora mesmo a sua compra e viva experiências maravilhosas no mundo gamer.", color: "Branco", description: "Leve a sua diversão a outro nível com o PlayStation 5 Slim, o console de última geração da Sony. Aproveite gráficos em 4K, carregamento ultrarrápido com SSD e jogos exclusivos. A edição digital é compatível com milhares de jogos do PS4.", resources: ["Retrocompatível com PS4", "Feedback tátil e gatilhos adaptáveis", "Áudio 3D"], games: ["Gran Turismo 7", "ASTRO BOT", "ASTRO'S PLAYROOM"], packageContents: ["Console PS5 Slim", "Controle sem fio DualSense", "Voucher Gran Turismo 7", "Voucher ASTRO BOT", "Pés de suporte", "Cabo HDMI e cabos de alimentação"] },
    { id: "smartwatch-redmi-watch-4", name: "Smartwatch Z4 Xiaomi", brand: "Xiaomi", category: "Smartwatches", image: "https://images.kabum.com.br/produtos/fotos/sync_mirakl/572553/xlarge/Smartwatch-Xiaomi-Redmi-Watch-4-20-5cm-Tela-1-97-Monitoramento-De-Sa-de-Preto_1750094378.jpg", model: "Redmi Watch 4", summary: "Veja os detalhes do smartwatch Xiaomi e consulte a disponibilidade.", color: "Preto" },
    { id: "jbl-tune-520bt", name: "Headset JBL Tune 520BT", brand: "JBL", category: "Fones", image: "https://images.tcdn.com.br/img/img_prod/1140357/headphone_jbl_tune_520bt_bluetooth_azul_jblt520btblu_4621_1_4f15704f7ead2b50fbc830dea8bde0c0.jpg", model: "Tune 520BT", summary: "Som e liberdade sem fio para acompanhar sua rotina.", color: "Azul" },
    { id: "capinha-samsung-a13", name: "Capinha para Samsung A13", brand: "Samsung", category: "Eletrônicos", image: "https://cdn.awsli.com.br/2569/2569613/produto/241001336c495dcb03e.jpg", model: "Galaxy A13", summary: "Acessório de proteção para o Samsung Galaxy A13.", color: "Transparente" },
    { id: "iphone-15-256gb", name: "iPhone 15 256GB", brand: "Apple", category: "Smartphones", image: "https://http2.mlstatic.com/D_817973-MLA95496625056_102025-C.jpg", model: "iPhone 15", storage: "256 GB", summary: "Consulte disponibilidade e detalhes do iPhone 15 de 256 GB.", color: "Titânio" },
    { id: "samsung-galaxy-s25-ultra", name: "Samsung Galaxy S25 Ultra", brand: "Samsung", category: "Smartphones", image: "https://images.kabum.com.br/produtos/fotos/sync_mirakl/523492/xlarge/Smartphone-Samsung-Galaxy-A25-5G-256GB-8GB-RAM-Octa-Core-C-mera-Tripla-50MP-Tela-6-5-Azul-Escuro_1764857022.jpg", model: "Galaxy S25 Ultra", summary: "Consulte disponibilidade e opções para o Samsung Galaxy S25 Ultra.", color: "Azul" },
    { id: "controle-xbox-series-x", name: "Controle Xbox Series X", brand: "Microsoft", category: "Vídeo Games", image: "https://images.kabum.com.br/produtos/fotos/sync_mirakl/158630/xlarge/Controle-Sem-Fio-Xbox-Series-X-e-S-Microsoft-Carbon-Black-Bluetooth-Preto_1763736820.jpg", model: "Xbox Wireless Controller", summary: "Controle sem fio para Xbox Series X e dispositivos compatíveis.", color: "Preto" },
    { id: "ps4-slim-500gb", name: "PS4 Slim 500GB", brand: "Sony", category: "Vídeo Games", image: "https://cdn.awsli.com.br/800x800/118/118222/produto/16619909/e975ecf5dc.jpg", model: "PlayStation 4 Slim", storage: "500 GB", summary: "Consulte disponibilidade do PlayStation 4 Slim de 500 GB.", color: "Preto" },
    { id: "fone-bluetooth", name: "Fone de Ouvido Bluetooth", brand: "F&F Imports", category: "Fones", image: "img/fone de ouvido.png", model: "Fone sem fio", summary: "Fone sem fio para ouvir música e atender chamadas no dia a dia.", color: "Branco" },
    { id: "relogio-inteligente", name: "Relógio Inteligente", brand: "F&F Imports", category: "Smartwatches", image: "img/relogio.png", model: "Smartwatch", summary: "Relógio inteligente com recursos para acompanhar sua rotina.", color: "Preto" },
    { id: "capinha-smartphone", name: "Capinha para Smartphone", brand: "F&F Imports", category: "Eletrônicos", image: "img/capinha.png", model: "Acessório para smartphone", summary: "Acessório de proteção para smartphone. Consulte modelos compatíveis.", color: "Variadas" }
];

const productIndex = new Map(fallbackProducts.map((product) => [product.id, product]));
const parameters = new URLSearchParams(window.location.search);
const productId = parameters.get("id") || "ps5-slim";

function createDefaultSpecifications(product) {
    return [
        {
            title: "Características",
            icon: "▣",
            fields: [
                { label: "Marca", value: product.brand },
                { label: "Modelo", value: product.model || product.name },
                { label: "Categoria", value: product.category },
                ...(product.storage ? [{ label: "Armazenamento", value: product.storage }] : [])
            ]
        },
        {
            title: "Recursos",
            icon: "⚙",
            fields: (product.resources || ["Consulte os recursos e a compatibilidade com a equipe."]).map((value) => ({ value }))
        },
        ...(product.games ? [{
            title: "Jogos inclusos",
            icon: "▤",
            fields: product.games.map((value) => ({ value }))
        }] : []),
        {
            title: "Conteúdo da embalagem",
            icon: "◇",
            fields: (product.packageContents || [product.name, "Consulte os itens inclusos com a equipe."]).map((value) => ({ value }))
        }
    ];
}

function normalizeProduct(data, fallback) {
    const raw = data.produto || data.product || data;
    const images = raw.images || raw.imagens || (raw.image || raw.imagem ? [raw.image || raw.imagem] : fallback.images || [fallback.image]);
    const colors = raw.colors || raw.cores || fallback.colors || [{ name: fallback.color || "Preto", value: "#1b1d1c" }];
    const specifications = raw.specifications || raw.fichaTecnica || fallback.specifications || createDefaultSpecifications({ ...fallback, ...raw });

    return {
        ...fallback,
        ...raw,
        id: raw.id || fallback.id,
        name: raw.name || raw.nome || fallback.name,
        category: raw.category || raw.categoria || fallback.category,
        summary: raw.summary || raw.resumo || fallback.summary,
        description: raw.description || raw.descricao || fallback.description || fallback.summary,
        images: Array.isArray(images) ? images : [images],
        colors,
        payments: raw.payments || raw.formasPagamento || ["Pix", "Cartão de débito e crédito", "Dinheiro"],
        specifications,
        relatedProducts: raw.relatedProducts || raw.produtosRelacionados || []
    };
}

async function loadProduct(id) {
    const fallback = productIndex.get(id) || {
        id,
        name: parameters.get("nome") || "Produto F&F Imports",
        brand: "F&F Imports",
        category: "Produto",
        model: parameters.get("nome") || "Consulte a equipe",
        image: parameters.get("imagem") || "img/ps5.jpg",
        summary: "Consulte disponibilidade, características e opções diretamente com a equipe F&F Imports."
    };

    if (PRODUCT_API_BASE_URL) {
        try {
            const response = await fetch(`${PRODUCT_API_BASE_URL}/products/${encodeURIComponent(id)}`);
            if (response.ok) return normalizeProduct(await response.json(), fallback);
        } catch (error) {
            console.warn("Não foi possível consultar a API de produtos. Exibindo dados de demonstração.", error);
        }
    }

    return normalizeProduct(fallback, fallback);
}

function setText(elementId, value) {
    document.getElementById(elementId).textContent = value || "";
}

function renderGallery(product) {
    const images = product.images.filter(Boolean);
    const mainImage = document.getElementById("produto-imagem");
    const thumbnails = document.getElementById("produto-miniaturas");
    mainImage.src = images[0] || product.image;
    mainImage.alt = product.name;
    thumbnails.replaceChildren();

    images.forEach((image, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "produto-miniatura";
        button.setAttribute("aria-label", `Ver imagem ${index + 1} de ${product.name}`);
        button.setAttribute("aria-pressed", String(index === 0));
        const thumbnail = document.createElement("img");
        thumbnail.src = image;
        thumbnail.alt = "";
        button.append(thumbnail);
        button.addEventListener("click", () => {
            mainImage.style.opacity = "0";
            window.setTimeout(() => {
                mainImage.src = image;
                mainImage.style.opacity = "1";
            }, 120);
            thumbnails.querySelectorAll(".produto-miniatura").forEach((item) => item.setAttribute("aria-pressed", "false"));
            button.setAttribute("aria-pressed", "true");
        });
        thumbnails.append(button);
    });
}

function renderColors(colors) {
    const container = document.getElementById("produto-cores");
    container.replaceChildren();
    colors.forEach((color, index) => {
        const option = typeof color === "string" ? { name: color, value: color } : color;
        const button = document.createElement("button");
        button.type = "button";
        button.className = "produto-cor";
        button.style.backgroundColor = option.value || option.hex || "#1b1d1c";
        button.title = option.name || option.nome || "Cor disponível";
        button.setAttribute("aria-label", button.title);
        button.setAttribute("aria-pressed", String(index === 0));
        button.addEventListener("click", () => {
            container.querySelectorAll(".produto-cor").forEach((item) => item.setAttribute("aria-pressed", "false"));
            button.setAttribute("aria-pressed", "true");
        });
        container.append(button);
    });
}

function renderPayments(payments) {
    const container = document.getElementById("produto-pagamentos");
    container.replaceChildren();
    payments.forEach((payment, index) => {
        const row = document.createElement("li");
        row.className = "produto-pagamento";
        const icon = document.createElement("span");
        icon.className = "pagamento-icone";
        icon.setAttribute("aria-hidden", "true");
        icon.textContent = ["P", "▤", "$ "][index % 3].trim();
        const label = document.createElement("span");
        label.textContent = typeof payment === "string" ? payment : payment.name || payment.nome;
        row.append(icon, label);
        container.append(row);
    });
}

function renderSpecifications(groups) {
    const container = document.getElementById("produto-ficha-painel");
    container.replaceChildren();
    groups.forEach((group) => {
        const section = document.createElement("section");
        section.className = "ficha-grupo";
        const heading = document.createElement("h3");
        const icon = document.createElement("span");
        icon.className = "ficha-icone";
        icon.setAttribute("aria-hidden", "true");
        icon.textContent = group.icon || "•";
        const title = document.createElement("span");
        title.textContent = group.title || group.titulo || "Informações";
        heading.append(icon, title);
        const fields = document.createElement("div");
        fields.className = "ficha-campos";
        (group.fields || group.campos || []).forEach((field) => {
            const paragraph = document.createElement("p");
            paragraph.className = "ficha-campo";
            if (typeof field === "string") {
                paragraph.textContent = field;
            } else if (field.label || field.rotulo) {
                const label = document.createElement("strong");
                label.textContent = `${field.label || field.rotulo}: `;
                paragraph.append(label, document.createTextNode(field.value || field.valor || ""));
            } else {
                paragraph.textContent = field.value || field.valor || "";
            }
            fields.append(paragraph);
        });
        section.append(heading, fields);
        container.append(section);
    });
}

function renderRelatedProducts(product) {
    const container = document.getElementById("produtos-relacionados");
    const related = (product.relatedProducts.length ? product.relatedProducts : fallbackProducts.filter((item) => item.id !== product.id))
        .map((item) => typeof item === "string" ? productIndex.get(item) : item)
        .filter(Boolean)
        .slice(0, 4);
    container.replaceChildren();

    related.forEach((item) => {
        const card = document.createElement("a");
        card.className = "produto-card produto-relacionado";
        card.href = `produto.html?id=${encodeURIComponent(item.id)}`;
        const image = document.createElement("img");
        image.src = item.image || item.imagem || (item.images || item.imagens || ["img/ps5.jpg"])[0];
        image.alt = item.name || item.nome || "Produto relacionado";
        const title = document.createElement("h3");
        title.textContent = item.name || item.nome || "Produto";
        const linkLabel = document.createElement("span");
        linkLabel.className = "produto-relacionado-acao";
        linkLabel.textContent = "Saiba mais";
        card.append(image, title, linkLabel);
        container.append(card);
    });
}

function renderProduct(product) {
    document.title = `${product.name} - F&F Imports`;
    setText("produto-categoria", product.category);
    setText("produto-nome", product.name);
    setText("produto-resumo", product.summary);
    setText("produto-descricao", product.description);
    renderGallery(product);
    renderColors(product.colors);
    renderPayments(product.payments);
    renderSpecifications(product.specifications);
    renderRelatedProducts(product);

    const whatsapp = document.getElementById("produto-whatsapp");
    whatsapp.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Olá, gostaria de saber mais sobre ${product.name}.`)}`;
}

loadProduct(productId)
    .then(renderProduct)
    .catch(() => {
        setText("produto-nome", "Não foi possível carregar este produto");
        setText("produto-resumo", "Volte ao catálogo e tente novamente.");
    });
