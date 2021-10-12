const rank = document.getElementById("rank");

leaderBoard();

function leaderBoard() {
  rank.innerHTML = "";
  let localStorageArray = [];
  let k = 0;
  for (i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i) != "p_1" && localStorage.key(i) != "p_2") {
      let obj = {
        userName: localStorage.key(i),
        wins: parseInt(localStorage.getItem(localStorage.key(i))),
        //wins: "56",
      };
      localStorageArray.push(obj);
      k++;
    }
  }

  let sortedArray = localStorageArray.sort((a, b) => {
    return b.wins - a.wins;
  });
  //return sortedArray;

  for (let i = 0; i < sortedArray.length; i++) {
    let idx = document.createElement("div");
    idx.className = `rows ${i + 1}`;

    let sn = document.createElement("div");
    sn.className = "serialNumber";
    sn.innerHTML = `${i + 1}`;
    idx.appendChild(sn);

    let un = document.createElement("div");
    un.className = "user_name";
    un.innerHTML = `${sortedArray[i].userName}`;
    idx.appendChild(un);

    let pt = document.createElement("div");
    pt.className = "pts";
    pt.innerHTML = `${sortedArray[i].wins}`;
    idx.appendChild(pt);

    rank.appendChild(idx);
    idx = document.getElementsByClassName(`rows ${i + 1}`);
  }
}

function saveData() {
  let p_1, p_2;

  p_1 = document.getElementById("p_1").value;
  p_2 = document.getElementById("p_2").value;

  localStorage.setItem("p_1", p_1);
  localStorage.setItem("p_2", p_2);

  let idx = localStorage.getItem(p_1);
  if (!idx) {
    localStorage.setItem(p_1, 0);
  }

  idx = localStorage.getItem(p_2);
  if (!idx) {
    localStorage.setItem(p_2, 0);
  }
}
