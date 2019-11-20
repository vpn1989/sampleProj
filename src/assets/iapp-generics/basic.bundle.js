(window.wbWebpackJsonp=window.wbWebpackJsonp||[]).push([[0],[,,,,,,,,,,function(e,t,n){"use strict";n.r(t),n.d(t,"template",(function(){return s}));var a=n(5),i=n(16);const s=e=>a.c`
  <div id="header">${Object(i.a)(e.headerContent)}</div>
  <div id="sidebar">${Object(i.a)(e.sidebarContent)}</div>
`},function(e,t,n){"use strict";n.r(t),n.d(t,"template",(function(){return i}));var a=n(5);const i=(e,t)=>a.c`
  <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom pl-0 pr-0">
    <div class="col-8 col-md-6">
      <a class="navbar-brand" href="/dashboard" @click=${t.mainMenuIconClick}><img src="${e.menuIcon}"/></a>
      <img class="cursor-pointer img-logo" src="${e.navLogo}" @click=${t.onLogoClick} />
      <i
        @click="${t.toggleSidebar}"
        class="px-3 py-1 fa fa-bars text-secondary cursor-pointer"
        aria-hidden="true"
      ></i>
    </div>
    <div class="col-4 col-md-6">
      <div class="" id="iapp-main-navbar-collapse">
        <ul class="d-flex flex-row-reverse navbar-nav ml-auto">
          <li class="nav-item dropdown">
            <button
              @click="${t.hideMenuList}"
              class="btn"
              type="button"
              id="dropdownLogoutMenuSelect"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
            </button>
            <div
              class="dropdown-menu position-absolute dropdown-menu-right ${e.menuListHidden?"show":""}"
              aria-labelledby="dropdownLogoutMenuSelect"
            >
              <a class="d-block d-sm-none dropdown-item border-bottom">Hi, <b>${e.userName}</b></a>
              ${l(e.menus,t)}
            </div>
          </li>
          <li class="nav-item dropdown mr-3 ${e.showLanguagleList?"d-none d-sm-none d-md-block":"d-none"}">
            <button
              @click="${t.hideLanguageList}"
              class="btn border dropdown-toggle"
              type="button"
              id="dropdownCountrySelect"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img
                class="mr-1"
                height="15"
                width="15"
                src="https://iappsdemo.fliplabs.net/IndustryAppFe/assets//images/flag_united_kingdom.png"
              />
              <span>${e.selectedLanguage}</span>
            </button>
            <div
              class="dropdown-menu dropdown-menu-right ${e.languageListHidden?"show":""}"
              aria-labelledby="dropdownCountrySelect"
            >
              ${c(e.languages,t)}
            </div>
          </li>
          <li class="nav-item dropdown mr-3 ${e.showPlantList?"d-none d-sm-none d-md-block":"d-none"}">
            <button
              @click="${t.hidePlantList}"
              class="btn border dropdown-toggle"
              type="button"
              id="dropdownRegionSelect"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span>${e.selectedPlant}</span>
            </button>
            <div
              class="dropdown-menu dropdown-menu-right ${e.plantListHidden?"show":""}"
              aria-labelledby="dropdownRegionSelect"
            >
              ${r(e.plants,t)}
            </div>
          </li>
          <li class="d-block d-md-none nav-item dropdown mr-3">${s(t,e)}</li>
          <li class="d-none d-sm-block nav-item dropdown mr-3">
            <div class="navbar-text">Hi, <b>${e.userName}</b></div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div
    class="col-12 position-absolute p-0 ${e.hideDropElementMobile?"d-block d-sm-block d-md-none":"d-none d-sm-none"}"
  >
    ${o(e.plants,t,e)}
    ${d(e.languages,t,e)}
  </div>
`,s=(e,t)=>a.c`
  <i
    class="fa fa-chevron-circle-down p-2 default-icon-color cursor-pointer mt-1 ${t.hideDropElementMobile?"d-none d-sm-none":""}"
    aria-hidden="true"
    @click="${e.toggleDropDownMobile}"
  ></i>
  <i
    class="fa fa-chevron-circle-up p-2 default-icon-color cursor-pointer mt-1 ${t.hideDropElementMobile?"":"d-none d-sm-none"}"
    aria-hidden="true"
    @click="${e.toggleDropDownMobile}"
  ></i>
`,o=(e,t,n)=>a.c`
  <button
    @click="${t.hidePlantList}"
    class="btn border-bottom w-100 dropdown-toggle text-right rounded-0"
    type="button"
    id="dropdownFullPlantSelect"
    data-toggle="dropdown"
    aria-haspopup="true"
    aria-expanded="false"
  >
    <span class="float-left">${n.selectedPlant}</span>
  </button>
  <div
    class="dropdown-menu w-100 dropdown-menu-right ${n.plantTemplateListHidden?"show":""}"
    aria-labelledby="dropdownFullPlantSelect"
  >
    ${void 0!==e?e.map(e=>a.c`
            <a @click=${t.onPlantItemClicked} data-plant="${JSON.stringify(e)}" class="dropdown-item "
              ><span data-plant="${JSON.stringify(e)}">${e.name}</span></a
            >
          `):""}
  </div>
`,d=(e,t,n)=>a.c`
  <button
    @click="${t.hideLanguageList}"
    class="btn border-bottom w-100 dropdown-toggle text-right rounded-0 ${n.plantTemplateListHidden?"d-none d-sm-none":""}"
    type="button"
    id="dropdownFullCountrySelect"
    data-toggle="dropdown"
    aria-haspopup="true"
    aria-expanded="false"
  >
    <div class="float-left">
      <img
        class="mr-1"
        height="15"
        width="15"
        src="https://iappsdemo.fliplabs.net/IndustryAppFe/assets//images/flag_united_kingdom.png"
      />
      <span>${n.selectedLanguage}</span>
    </div>
  </button>
  <div
    class="dropdown-menu w-100 dropdown-menu-right ${n.languageTemplateListHidden?"show":""}"
    aria-labelledby="dropdownFullCountrySelect"
  >
    ${void 0!==e?e.map(e=>a.c`
            <a @click=${t.onLanguageItemClicked} data-language="${JSON.stringify(e)}" class="dropdown-item"
              ><img class="mr-1" height="15" width="15" src="${e.icon}" />
              <span data-language="${JSON.stringify(e)}">${e.name}</span>
            </a>
          `):""}
  </div>
`,r=(e,t)=>a.c`
    ${void 0!==e?e.map(e=>a.c`
              <a @click=${t.onPlantItemClicked} data-plant="${JSON.stringify(e)}" class="dropdown-item"
                ><span data-plant="${JSON.stringify(e)}">${e.name}</span></a
              >
            `):""}
  `,c=(e,t)=>a.c`
    ${void 0!==e?e.map(e=>a.c`
              <a
                @click=${t.onLanguageItemClicked}
                data-language="${JSON.stringify(e)}"
                class="dropdown-item"
                ><img class="mr-1" height="15" width="15" src="${e.icon}" />
                <span data-language="${JSON.stringify(e)}">${e.name}</span>
              </a>
            `):""}
  `,l=(e,t)=>a.c`
    ${void 0!==e?e.map(e=>a.c`
              <a
                @click="${()=>t.onMenuItemClicked(e)}"
                data-menu="${JSON.stringify(e)}"
                class="dropdown-item cursor-pointer"
              >
                ${e.label}</a
              >
            `):""}
  `},function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));new Intl.NumberFormat("de-DE",{style:"currency",currency:"EUR",maximumFractionDigits:0,minimumFractionDigits:0}),new Intl.NumberFormat("de-DE",{style:"currency",currency:"EUR"}),new Intl.NumberFormat("de-DE",{style:"decimal",maximumFractionDigits:2,minimumFractionDigits:2}),new Intl.DateTimeFormat("de-DE",{month:"long",year:"numeric"});const a=e=>e.split("-").reduce((e,t)=>e?e+t[0].toLocaleUpperCase()+t.substr(1):t,"")},function(e,t,n){"use strict";n.r(t),n.d(t,"template",(function(){return d}));var a=n(5);const i=(e,t)=>a.c`
  <a @click="${()=>t.menuItemClick(e)}">
    <li class="${"list-inline p-1 mb-1 pl-3 pr-3 cursor-pointer"} ${e.active?"active":""}">
      <label class="w-100 cursor-pointer"> ${s(e.icon)} ${o(e.label)} </label>
    </li>
  </a>
`,s=e=>void 0===e?a.c``:a.c`
        <img class="${"sidebar-icon mr-2"}" src="${e}" />
      `,o=e=>a.c`
  <div class="${"sidebar-label ml-4"}">${e}</div>
`,d=(e,t)=>a.c`
  <div class="wrapper">
    <nav
      id="iapp-sidebar"
      class="border-right ${e.isMenuToggled?"d-none d-sm-none d-md-block d-lg-block ng-sidebar--closed":"opened ng-sidebar--opened"}"
    >
      <ul class="p-0 mt-4">
        ${((e,t)=>e.map(e=>i(e,t)))(e.sideBarMenuItems,t)}
      </ul>
    </nav>
  </div>
`},function(e,t,n){"use strict";n.r(t);const a=n(15);a.keys().forEach(a),t.default={}},function(e,t,n){var a={"./all.ts":14,"./header-sidebar/header-sidebar.tpl.ts":10,"./header-sidebar/header-sidebar.ts":17,"./header/header.tpl.ts":11,"./header/header.ts":18,"./sidebar/sidebar.tpl.ts":13,"./sidebar/sidebar.ts":19};function i(e){var t=s(e);return n(t)}function s(e){var t=a[e];if(!(t+1)){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}return t}i.keys=function(){return Object.keys(a)},i.resolve=s,e.exports=i,i.id=15},,function(e,t,n){"use strict";n.r(t),n.d(t,"HeaderSidebarComponent",(function(){return d}));var a=n(5),i=n(10),s=function(e,t,n,a){return new(n||(n=Promise))((function(i,s){function o(e){try{r(a.next(e))}catch(e){s(e)}}function d(e){try{r(a.throw(e))}catch(e){s(e)}}function r(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(o,d)}r((a=a.apply(e,t||[])).next())}))};const o={connected:!1,content:"",headerContent:"",sidebarContent:"\n<iapps-sidebar>\n    <iapp-applications>\n        <iapp-application>\n            <application-id>10</application-id>\n            <application-url>/purchase-order-calender</application-url>\n            <category-id>1</category-id>\n            <category-url>/dashboard/goods-inbound</category-url>\n            <category-name>Goods Inbound</category-name>\n            <category-icon>https://iappsdemo.fliplabs.net/IndustryAppFe/assets/icons/delivery.png</category-icon>\n        </iapp-application>\n        <iapp-application>\n            <application-id>11</application-id>\n            <application-url>/goods-recieving</application-url>\n            <category-id>1</category-id>\n            <category-url>/dashboard/goods-inbound</category-url>\n            <category-name>Goods Inbound</category-name>\n            <category-icon>https://iappsdemo.fliplabs.net/IndustryAppFe/assets/icons/delivery.png</category-icon>\n        </iapp-application>\n        <iapp-application>\n            <application-id>12</application-id>\n            <application-url>/quatlity-control</application-url>\n            <category-id>1</category-id>\n            <category-url>/dashboard/goods-inbound</category-url>\n            <category-name>Goods Inbound</category-name>\n            <category-icon>https://iappsdemo.fliplabs.net/IndustryAppFe/assets/icons/delivery.png</category-icon>\n        </iapp-application>\n        <iapp-application>\n            <application-id>13</application-id>\n            <application-url>/scheduler</application-url>\n            <category-id>2</category-id>\n            <category-url>/dashboard/production-prepration</category-url>\n            <category-name>Production Prepration</category-name>\n            <category-icon>https://iappsdemo.fliplabs.net/IndustryAppFe/assets/icons/icon_production_preparation.png</category-icon>\n        </iapp-application>\n        <iapp-application>\n            <application-id>14</application-id>\n            <application-url>/update-status</application-url>\n            <category-id>3</category-id>\n            <category-url>/dashboard/toolshop</category-url>\n            <category-name>Tool Shop</category-name>\n            <category-icon>https://iappsdemo.fliplabs.net/IndustryAppFe/assets/icons/icon_toolshop.png</category-icon>\n        </iapp-application>\n    </iapp-applications>\n</iapps-sidebar>\n    "};class d extends HTMLElement{constructor(){super(...arguments),this.state=Object.assign({},o)}static get observedAttributes(){return[...d.PASS_THROUGH_FIELDS]}connectedCallback(){this.getHtmlHeaderContent()}getMenuClickEvent(){document.querySelector("iapps-header").addEventListener("selectedPlantChoice",()=>{})}getPlantClickEvent(){document.querySelector("iapps-header").addEventListener("selectedMenuChoice",()=>{})}getLanguageClickEvent(){document.querySelector("iapps-header").addEventListener("selectedLanguageChoice",()=>{})}onClickLogoEvent(){document.querySelector("iapps-header").addEventListener("onClickLogo",()=>{})}onClickMainMenuEvent(){document.querySelector("iapps-header").addEventListener("onClickMainMenu",()=>{})}getHtmlHeaderContent(){return s(this,void 0,void 0,(function*(){const e=yield window.fetch("/components/preview/industry-apps-header--user-header");yield e.text().then(e=>(this.state.headerContent=e,(new DOMParser).parseFromString(e,"text/xml")));const t=yield window.fetch("/components/preview/industry-apps-side-bar");return yield t.text().then(e=>(this.state.sidebarContent=e,(new DOMParser).parseFromString(e,"text/xml"))),this.updateState("headerContent",this.state.headerContent),this.updateState("sidebarContent",this.state.sidebarContent),this.getMenuClickEvent(),this.getPlantClickEvent(),this.getLanguageClickEvent(),this.onClickLogoEvent(),this.onClickMainMenuEvent(),"text"}))}render(){Object(a.d)(Object(i.template)(this.state),this,{eventContext:this})}updateState(e,t){this.state=Object.assign(Object.assign({},this.state),{[e]:t}),this.render()}}d.PASS_THROUGH_FIELDS=["menu-icon","nav-logo","user-name","selected-plant","selected-language"],customElements.define("iapps-header-sidebar",d)},function(e,t,n){"use strict";n.r(t),n.d(t,"HeaderComponent",(function(){return d}));var a=n(5),i=n(11),s=n(12);const o={connected:!1,hideDropElementMobile:!1,plantListHidden:!1,plantTemplateListHidden:!1,languageListHidden:!1,languageTemplateListHidden:!1,showLanguagleList:!0,showPlantList:!0,menuListHidden:!1,plants:[],languages:[],menus:[]};class d extends HTMLElement{constructor(){super(...arguments),this.state=Object.assign({},o)}static get observedAttributes(){return[...d.PASS_THROUGH_FIELDS]}connectedCallback(){this.state.connected||(this.updatePlant(),this.updateLanguage(),this.updateMenu(),this.updateState("connected",!0))}disConnectedCallback(){this.updateState("connected",!1)}updateMenu(){const e=this.querySelector("iapps-header-menu-list"),t=e.children,n=[].slice.call(t),a=new Array;for(const e of n){const t=e,n={url:t.querySelector("main-menu-url").innerHTML,label:t.querySelector("main-menu-label").innerHTML};a.push(n)}e?this.updateState("menus",a):this.updateState("menus","")}updateLanguage(){const e=this.querySelector("iapps-header-language-list");if(!e)return void this.updateState("showLanguagleList",!1);const t=e.children,n=[].slice.call(t),a=new Array;for(const e of n){const t=e,n={id:parseInt(t.querySelector("language-id").innerHTML,0),icon:t.querySelector("language-icon").innerHTML,name:t.querySelector("language-name").innerHTML};a.push(n)}this.updateState("languages",a)}updatePlant(){const e=this.querySelector("iapps-header-plant-list");if(!e)return void this.updateState("showPlantList",!1);const t=e.children,n=[].slice.call(t),a=new Array;for(const e of n){const t=e,n={id:parseInt(t.querySelector("plant-id").innerHTML,0),name:t.querySelector("plant-name").innerHTML};a.push(n)}this.updateState("plants",a)}render(){Object(a.d)(Object(i.template)(this.state,{hidePlantList:()=>{screen.width>767?this.updateState("plantListHidden",!this.state.plantListHidden):this.updateState("plantTemplateListHidden",!this.state.plantTemplateListHidden)},hideLanguageList:()=>{screen.width>767?this.updateState("languageListHidden",!this.state.languageListHidden):this.updateState("languageTemplateListHidden",!this.state.languageTemplateListHidden)},hideMenuList:()=>{this.updateState("menuListHidden",!this.state.menuListHidden)},toggleSidebar:e=>{const t=new CustomEvent("toggleMenuClick",{detail:{event:e}});this.dispatchEvent(t)},toggleDropDownMobile:()=>{this.updateState("hideDropElementMobile",!this.state.hideDropElementMobile)},onPlantItemClicked:e=>{screen.width>767?this.updateState("plantListHidden",!this.state.plantListHidden):this.updateState("plantTemplateListHidden",!this.state.plantTemplateListHidden);const t=e.target;if(null!=t){const n=t.getAttribute("data-plant"),a=JSON.parse(n);this.updateState("selected-plant",a.name);const i=new CustomEvent("selectedPlantChoice",{detail:{event:e}});this.dispatchEvent(i)}},onLanguageItemClicked:e=>{screen.width>767?this.updateState("languageListHidden",!this.state.languageListHidden):this.updateState("languageTemplateListHidden",!this.state.languageTemplateListHidden);const t=e.target;if(null!=t){const n=t.getAttribute("data-language"),a=JSON.parse(n);this.updateState("selected-language",a.name);const i=new CustomEvent("selectedLanguageChoice",{detail:{event:e}});this.dispatchEvent(i)}},onMenuItemClicked:e=>{this.updateState("menuListHidden",!this.state.menuListHidden);const t=new CustomEvent("selectedMenuChoice",{detail:{menu:e}});this.dispatchEvent(t)},onLogoClick:()=>{const e=new CustomEvent("onClickLogo",{detail:{event:event}});this.dispatchEvent(e)},mainMenuIconClick:()=>{const e=new CustomEvent("onClickMainMenu",{detail:{event:event}});this.dispatchEvent(e)}}),this,{eventContext:this})}attributeChangedCallback(e,t,n){this.updateState(e,n)}updateState(e,t){let n=this.state;switch(e){case"connected":n=Object.assign(Object.assign({},this.state),{connected:Boolean(t)});break;default:if(n[e=Object(s.a)(e)]===t)break;n=Object.assign(Object.assign({},n),{[e]:t})}const a=n!==this.state;this.state=n,this.state.connected&&a&&this.render()}}d.PASS_THROUGH_FIELDS=["menu-icon","nav-logo","user-name","selected-plant","selected-language"],customElements.define("iapps-header",d)},function(e,t,n){"use strict";n.r(t);var a=n(12),i=n(5),s=n(13);const o=767,d={connected:!1,isMobile:!1,isMenuToggled:!1,sideBarMenuItems:[]},r=document.body,c={label:"category-name",icon:"category-icon",categoryID:"category-id",href:"category-url"};class l extends HTMLElement{constructor(){super(),this.state=Object.assign({},d),this.state=Object.assign({},d)}static get observedAttributes(){return[...l.PASS_THROUGH_FIELDS]}attributeChangedCallback(e,t,n){this.updateState(e,n)}connectedCallback(){this.state.connected||(this.prepareSidebarMenuItems(),this.prepareSidebar(),this.updateState("connected",!0))}disConnectedCallback(){this.updateState("connected",!1)}updateState(e,t){let n=this.state;switch(e){case"connected":n=Object.assign(Object.assign({},this.state),{connected:Boolean(t)});break;default:if(n[e=Object(a.a)(e)]===t)break;n=Object.assign(Object.assign({},n),{[e]:t})}const i=n!==this.state;this.state=n,this.state.connected&&i&&this.render()}render(){Object(i.d)(Object(s.template)(this.state,{menuItemClick:e=>{if(e.active)return;this.state.sideBarMenuItems.map(t=>{t.active=e.categoryID===t.categoryID});const t=e.href;if(this.state.reloadPage&&"true"===String(this.state.reloadPage))window.location.href=window.location.origin+t;else{const e=new CustomEvent("menuItemClicked",{detail:{url:t}});this.dispatchEvent(e)}this.updateState("activeMenuItem",e)}}),this,{eventContext:this})}prepareSidebarMenuItems(){const e=this.querySelector("iapp-applications");if(void 0===e||!e)return void this.updateState("sideBarMenuItems","");const t=e.children,n=[].slice.call(t),a=new Array;n.forEach(e=>{const t=e,n={label:t.querySelector(c.label).innerHTML,icon:t.querySelector(c.icon).innerHTML,href:t.querySelector(c.href).innerHTML,categoryID:parseInt(t.querySelector(c.categoryID).innerHTML,0)};a.push(n)});const i=this.filterDuplicates(a),s=this.setActiveMenuItem(i);this.updateState("sideBarMenuItems",s)}prepareSidebar(){if(screen.width<=o?(this.updateState("isMobile",!0),this.updateState("isMenuToggled",!0)):r.classList.add("opened"),document.querySelector("iapps-header")){document.querySelector("iapps-header").addEventListener("toggleMenuClick",()=>{this.toggleSidebar()})}}toggleSidebar(){this.state.isMenuToggled?r.classList.add("opened"):r.classList.remove("opened"),this.updateState("isMenuToggled",!this.state.isMenuToggled)}filterDuplicates(e){const t=Array.from(new Set(e.map(e=>e.categoryID))),n=new Array;return t.forEach(t=>{const a=e.find(e=>e.categoryID===t);void 0!==a&&n.push(a)}),n}setActiveMenuItem(e){const t=window.location.href.replace(window.location.origin,"");return e.map(e=>{e.href===t?(e.active=!0,this.updateState("activeMenuItem",e)):e.active=!1}),e}}l.PASS_THROUGH_FIELDS=["reload-page"],customElements.define("iapps-sidebar",l)}]]);
//# sourceMappingURL=basic.bundle.js.map