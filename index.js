const storageKey = "streaks";
const streaksData = JSON.parse(localStorage.getItem(storageKey));
const fake = streaksData
  ? streaksData
  : {
      [new Date().getFullYear()]: Array.from({ length: 12 }, () =>
        Array(37).fill(0)
      ),
    };

const yearTemplate = document.getElementById("year-template");
const monthTemplate = document.getElementById("month-template");
const dayTemplate = document.getElementById("day-template");
const body = document.querySelector("body");

//reads from fake and generate
generateCal(fake);
document.querySelectorAll(".check").forEach((c) => {
  c.addEventListener("change", updateStreak);
});

function generateCal(fake) {
  if (!fake) return;
  for (let y in fake) {
    // debugger
    const yClone = yearTemplate.content.cloneNode(true);
    const ySection = yClone.querySelector(".year");
    const yName = yClone.querySelector(".year_name");
    yName.textContent = y;
    //    const Y = fake[y]?.length === 12 ? fake[y] : Array(12).fill([]);

    for (let m = 0; m < 12; m++) {
      const firstDayObj = new Date(y, m, 1);
      const dayOfWeek = firstDayObj.getDay(); //0 - 6
      const monthObj = new Date(y, m + 1, 0); //gives last date
      const noOfDays = monthObj.getDate();

      const mClone = monthTemplate.content.cloneNode(true);
      const mArticle = mClone.querySelector(".month");
      const mName = mClone.querySelector(".month_name");
      mName.textContent = new Intl.DateTimeFormat("en-US", {
        month: "long",
      }).format(firstDayObj);
      if (!fake[y][m]) {
        console.error("invalid data year,month: ", y, m);
        return;
      }
      const M = fake[y][m];

      let date = 1;
      for (let i = 0; i < 37; i++) {
        const dClone = dayTemplate.content.cloneNode(true);
        // visibility hidden for unused divs
        // comment to add hatching instead
        // const dDiv = dClone.querySelector('.day');
        const check = dClone.querySelector(".check");
        const streakmark = dClone.querySelector(".streakmark");
        if (i < dayOfWeek || noOfDays + dayOfWeek <= i) {
          check.disabled = true;
          // dDiv.classList.add('novisibility');
        }
        if (i >= dayOfWeek && date <= noOfDays) {
          streakmark.textContent = date.toString();
          // putting inside name = yyyy-mm(index)-dd(index)
          check.name = `${y}-${m}-${i}`;
          check.checked = !!(M[i] === 1);
          date++;
        }
        mArticle.appendChild(dClone);
      }
      ySection.appendChild(mClone);
    }
    body.appendChild(yClone);
  }
}

function saveToLocalStorage(key, data) {
  if (!key || !data) {
    console.error("no key for storage wont be saved");
    return;
  }
  localStorage.setItem(key, JSON.stringify(data));
}

function updateStreak(e) {
  // yyyy-mm(index)-dd(index)
  const dateArray = e.target?.name.split("-").map((x) => parseInt(x));
  const [y, mIdx, dIdx] = dateArray;
  console.log(y, mIdx, dIdx);
  console.log(fake);
  fake[y][mIdx][dIdx] = e.target.checked ? 1 : 0;
  saveToLocalStorage(storageKey, fake);
}
