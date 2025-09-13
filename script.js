(function () {
  "use strict";
  function $(id) { return document.getElementById(id); }
  function num(v) {
    v = (v == null ? "" : String(v)).trim();
    var n = parseFloat(v);
    return isNaN(n) ? 0 : n;
  }
  function fmt(n) {
    if (!isFinite(n)) return "–";
    if (Math.abs(n) >= 1000000 || Math.abs(n) < 0.001) return n.toExponential(3);
    return n.toLocaleString(undefined, { maximumFractionDigits: 3 });
  }

  function compute() {
    var bags = num($("bags").value);
    var kgPerBag = num($("kgPerBag").value);
    var rho = num($("rho").value);          // g/cm³
    var eff = num($("eff").value);
    if (eff <= 0 || eff > 100) eff = 100;

    var massKg = bags * kgPerBag;
    var loose_cm3 = rho > 0 ? (massKg * 1000) / rho : 0;
    var loose_L   = loose_cm3 / 1000;
    var loose_m3  = loose_cm3 / 1000000;
    var loose_ft3 = loose_m3 * 35.3146667;

    var cvg_cm3 = loose_cm3 / (eff / 100);
    var cvg_L   = cvg_cm3 / 1000;
    var cvg_m3  = cvg_cm3 / 1000000;
    var cvg_ft3 = cvg_m3 * 35.3146667;

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
    ["bags", "kgPerBag", "rho", "eff"].forEach(function (id) {
      $(id).addEventListener("input", compute);
      $(id).addEventListener("change", compute);
      $(id).addEventListener("keyup", compute);
    });
    compute(); // first render
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
