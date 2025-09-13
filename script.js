(function () {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const num = (v) => parseFloat(String(v ?? "").trim()) || 0;
  const fmt = (n) =>
    !isFinite(n)
      ? "–"
      : Math.abs(n) >= 1e6 || Math.abs(n) < 1e-3
      ? n.toExponential(3)
      : n.toLocaleString(undefined, { maximumFractionDigits: 3 });

  function compute() {
    const bags = num($("bags").value);
    const kgPerBag = num($("kgPerBag").value);
    const rho = num($("rho").value);          // g/cm³
    const eff = Math.min(100, Math.max(1, num($("eff").value) || 100));

    const massKg = bags * kgPerBag;
    const loose_cm3 = rho > 0 ? (massKg * 1000) / rho : 0;
    const loose_L = loose_cm3 / 1000;
    const loose_m3 = loose_cm3 / 1_000_000;
    const loose_ft3 = loose_m3 * 35.3146667;

    const cvg_cm3 = loose_cm3 / (eff / 100);
    const cvg_L = cvg_cm3 / 1000;
    const cvg_m3 = cvg_cm3 / 1_000_000;
    const cvg_ft3 = cvg_m3 * 35.3146667;

    $("massKg").textContent = fmt(massKg) + " kg";
    $("bagsOut").textContent = fmt(bags);
    $("kgPerBagOut").textContent = fmt(kgPerBag);
    $("rhoOut").textContent = rho ? rho.toFixed(2) : "–";

    $("looseMain").textContent = fmt(loose_cm3) + " cm³";
    $("looseCm3").textContent = fmt(loose_cm3);
    $("looseL").textContent = fmt(loose_L);
    $("looseM3").textContent = fmt(loose_m3);
    $("looseFt3").textContent = fmt(loose_ft3);

    $("cvgMain").textContent = fmt(cvg_cm3) + " cm³";
    $("cvgCm3").textContent = fmt(cvg_cm3);
    $("cvgL").textContent = fmt(cvg_L);
    $("cvgM3").textContent = fmt(cvg_m3);
    $("cvgFt3").textContent = fmt(cvg_ft3);
  }

  function init() {
    ["bags", "kgPerBag", "rho", "eff"].forEach((id) => {
      $(id).addEventListener("input", compute);
      $(id).addEventListener("change", compute);
      $(id).addEventListener("keyup", compute);
    });
    compute(); // initial render
  }

  window.addEventListener("DOMContentLoaded", init);
})();
