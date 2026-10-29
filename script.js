// ===== Ano automático no rodapé =====
const ano = document.getElementById("ano");
if (ano) ano.textContent = new Date().getFullYear();
 
// ===== Menu mobile =====
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");
 
if (toggle && nav) {
    toggle.addEventListener("click", () => {
        const aberto = nav.classList.toggle("open");
        toggle.setAttribute("aria-expanded", aberto);
        toggle.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
    });
 
    // Fecha o menu ao clicar em um link
    nav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            nav.classList.remove("open");
            toggle.setAttribute("aria-expanded", "false");
            toggle.setAttribute("aria-label", "Abrir menu");
        });
    });
}
 
// ===== Destaca no menu a seção visível =====
const links = document.querySelectorAll('nav a[href^="#"]');
const secoes = [...links]
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);
 
const observer = new IntersectionObserver(
    (entradas) => {
        entradas.forEach((entrada) => {
            if (!entrada.isIntersecting) return;
            links.forEach((link) => {
                link.classList.toggle(
                    "active",
                    link.getAttribute("href") === `#${entrada.target.id}`
                );
            });
        });
    },
    { rootMargin: "-40% 0px -55% 0px" }
);
 
secoes.forEach((secao) => observer.observe(secao));

// ===== Copiar e-mail (página de contato) =====
const status = document.getElementById("copy-status");

document.querySelectorAll("[data-copy]").forEach((botao) => {
    const textoOriginal = botao.textContent;

    botao.addEventListener("click", async () => {
        const valor = botao.dataset.copy;

        try {
            await navigator.clipboard.writeText(valor);
        } catch {
            // Plano B: abrir o arquivo direto do disco (file://) bloqueia a API acima
            const campo = document.createElement("textarea");
            campo.value = valor;
            document.body.appendChild(campo);
            campo.select();
            document.execCommand("copy");
            campo.remove();
        }

        botao.textContent = "Copiado!";
        if (status) status.textContent = "E-mail copiado para a área de transferência.";

        setTimeout(() => {
            botao.textContent = textoOriginal;
            if (status) status.textContent = "";
        }, 2000);
    });
});
 