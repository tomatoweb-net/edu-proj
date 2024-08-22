(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();async function w(i){try{const n=await fetch(`https://bianco.sitiweb.toscana.it/wp-json/wp/v2/docs?slug=${i}`);if(!n.ok)throw new Error("Network response was not ok");const s=await n.json();if(s.length>0)v(s[0]);else{console.error("No article found with the provided slug.");const o=document.getElementById("article-display");o.innerHTML="<p>No article found.</p>"}}catch(n){console.error("There was a problem with the fetch operation:",n)}}function b(i){const n=document.getElementById("docs-list"),s=document.getElementById("article-display");n.innerHTML="",s.innerHTML="",Object.values(i).forEach(t=>{if(t.name==="Uncategorized"||t.count===0||t.parent!==0)return;const a=document.createElement("div");a.className="category-section";const f=document.createElement("h2");f.textContent=t.name,f.className="text-primary",a.appendChild(f);const g=document.createElement("div");g.className="subcategory-list",fetch(`https://bianco.sitiweb.toscana.it/wp-json/wp/v2/categories?parent=${t.id}`).then(m=>m.json()).then(m=>{m.length>0?(m.forEach(d=>{const r=document.createElement("div");r.className="subcategory-section";const c=document.createElement("h4");c.textContent=d.name,r.appendChild(c);const u=document.createElement("div");u.className="subcategory-list",fetch(`https://bianco.sitiweb.toscana.it/wp-json/wp/v2/docs?categories=${d.id}`).then(h=>h.json()).then(h=>{h.length!==0&&(h.forEach(l=>{const p=document.createElement("div");p.className="subcategory-item",p.innerHTML=`
                                      <ul class="list-group mt-2">
                                          <li class="list-group-item article-item" data-article-id="${l.id}" data-article-slug="${l.slug}" data-article-title="${l.title.rendered.toLowerCase()}">
                                              <a href="#" class="article-link" data-article-id="${l.id}" data-article-slug="${l.slug}">${l.title.rendered}</a>
                                          </li>
                                      </ul>
                                  `,u.appendChild(p)}),r.appendChild(u),g.appendChild(r),document.querySelectorAll(".article-link").forEach(l=>{l.addEventListener("click",function(p){p.preventDefault();const y=this.getAttribute("data-article-slug");w(y),history.pushState(null,null,`?article=${y}`)})}))})}),a.appendChild(g)):fetch(`https://bianco.sitiweb.toscana.it/wp-json/wp/v2/docs?categories=${t.id}`).then(d=>d.json()).then(d=>{if(d.length>0){const r=document.createElement("div");r.className="subcategory-list",d.forEach(c=>{const u=document.createElement("div");u.className="subcategory-item",u.innerHTML=`
                                      <ul class="list-group mt-2">
                                          <li class="list-group-item article-item" data-article-id="${c.id}" data-article-slug="${c.slug}" data-article-title="${c.title.rendered.toLowerCase()}">
                                              <a href="#" class="article-link" data-article-id="${c.id}" data-article-slug="${c.slug}">${c.title.rendered}</a>
                                          </li>
                                      </ul>
                                  `,r.appendChild(u)}),a.appendChild(r)}}),n.appendChild(a)})});const e=document.getElementById("search-input-main");e.addEventListener("input",function(){const t=e.value.toLowerCase();E(t)})}function E(i){document.querySelectorAll(".category-section").forEach(s=>{let o=!1;s.querySelectorAll(".subcategory-section, .subcategory-item").forEach(e=>{const a=e.textContent.toLowerCase().includes(i);e.style.display=a?"":"none",a&&(o=!0)}),s.style.display=o?"":"none"})}function v(i){const n=document.getElementById("docs-list"),s=document.getElementById("article-display");document.getElementById("content"),n.style.display="none",s.innerHTML=`
      <a href="/" class="btn-back">← Torna indietro</a>
      <h2 class="article-display-title">${i.title.rendered}</h2>
      <div class="article-display-content">${i.content.rendered}</div>
  `,document.querySelector(".btn-back").addEventListener("click",function(o){o.preventDefault(),window.location.href="/"}),document.querySelector(".navbar-brand").addEventListener("click",function(o){o.preventDefault(),window.location.href="/"})}async function L(){const n=new URLSearchParams(window.location.search).get("article");n?await w(n):await C()}async function C(){try{const n=await(await fetch("https://bianco.sitiweb.toscana.it/wp-json/wp/v2/categories")).json();b(n)}catch(i){console.error("Error loading categories:",i)}}L();
