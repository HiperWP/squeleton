/**
 * Global application state
 * Single source of truth for all mutable state
 */

function getInitialState() {
  const defaultHTML = `<section id="hero" class="p-30-tb f-justify-center h-100vh custom-gradient">
  <div class="container">
    <div class="row gap-15">
      <div class="c-xs-12 c-sm-9 c-md-6 c-center">
        <div class="f-grid f-items-center f-justify-center">
          <i class="fs-12 iccon-rocket-1 p-15-r animated delay-800 floatIn"></i>
          <h1 class="fs-16 m-25-tb fw-700 animated slideIn">Squeleton</h1>
          <div class="fs-3 m-10-l p-5-lr border-rd-4 border-all animated magnetIn delay-800">v4.7.4</div>
        </div>
        <p class="fs-10 p-20-tb text-center animated delay-500 fadeInUp">Boilerplate leve e moderno que combina o melhor do CSS utilitário, grid responsivo, animações elegantes e bibliotecas JavaScript essenciais para criar interfaces rápidas e intuitivas.</p>
      </div>
    </div>
  </div>
</section>`;

  const defaultCSS = `:root {
  --primary-color: #4d00ff;
  --secundary-color: #0779b6;
}

.custom-gradient {
  background: linear-gradient(135deg, var(--primary-color), var(--secundary-color), var(--primary-color));
  background-size: 200% 200%;
  color: white;
}`;

  const defaultJS = ``;

  return {
    layers: [],
    cssRules: {},
    globalCss: "",
    selectedLayerId: null,
    multipleSelectedLayerIds: [],
    lastSelectedId: null,
    contextMenuLayerId: null,
    cssStyleMode: localStorage.getItem("c2b-cssStyleMode") || "custom",
    cssMode: localStorage.getItem("c2b-cssMode") || "element",
    allLayersExpanded: false,
    dependencies: [],
    hasDismissedDependencyBadge: false,
    externalCSS: "",
    externalJS: "",
    activeContentHash: null,
    dependenciesLocked: false,
    lastFullPageParse: null,
    contentEditMode: false,
    originalFullPageHtml: null,
    disablePreviewHighlights: JSON.parse(
      localStorage.getItem("c2b-disable-preview-highlights") ?? "false"
    ),
    defaultHTML,
    defaultCSS,
    defaultJS,
  };
}

const state = getInitialState();

export default state;
