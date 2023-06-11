const fake = {
  2023: [
    [
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0,
    ],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ],
};

const yearTemplate = document.getElementById("year-template");
const monthTemplate = document.getElementById("month-template");
const dayTemplate = document.getElementById("day-template");
const body = document.querySelector("body");

//reads from fake and generate
for (let y in fake) {
  // debugger
  const yClone = yearTemplate.content.cloneNode(true);
  const ySection = yClone.querySelector(".year");
  const yName = yClone.querySelector(".year_name");
  yName.textContent = y;
  const Y = fake[y]?.length === 12 ? fake[y] : Array(12).fill([]);

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
    const M = Y[m]?.length === 37 ? Y[m] : Array(37).fill(0);

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
