// let idx = localStorage.getItem("index");
// const t = document.getElementById("test");
// if (idx) {
//   t.innerHTML = idx;
// } else {
//   localStorage.setItem("index", 0);
// }

function saveData() {
  /*let smp, idx, obj, p;

  for (let i = 1; i <= 2; i++) {
    smp = "p_";
    let num = i;
    smp += num.toString();
    p = document.getElementById(smp).value;
    idx = localStorage.getItem(p);
    //const t = document.getElementById("test");
    if (!idx) {
      localStorage.setItem(p, 0);
    }
  }*/

  let p_1, p_2;

  p_1 = document.getElementById("p_1").value;
  p_2 = document.getElementById("p_2").value;

  let idx = localStorage.getItem(p_1);
  if (!idx) {
    localStorage.setItem(p_1, 0);
  }

  idx = localStorage.getItem(p_2);
  if (!idx) {
    localStorage.setItem(p_2, 0);
  }
}
