const apiKey = '855273cafc8aba763951dd5ed10dbed1';
const inpCity = document.getElementById('inpCity');

window.addEventListener('DOMContentLoaded', () => {
   getApi("Dubai");
   forecastDay5();

   const PressEnter = e => e.key === 'Enter' && search();
   inpCity.addEventListener('keypress', PressEnter);
});

function search() {
   const cityName = inpCity.value.trim();
   if (cityName !== '') {
      getApi(cityName);
      forecastDay5();
   } else {
      alert('Введите название города!');
      inpCity.focus();
   }
}

function getApi(inpCITY) {
   const url = `https://api.openweathermap.org/data/2.5/forecast?q=${inpCITY}&appid=${apiKey}&units=metric`;

   fetch(url).then((response) => response.json()).then((data) => {
      if (data.message == "city not found") {
         inpCity.value = "";
         inpCity.focus();
         document.querySelectorAll(".boxWith_information").forEach(elem => {
            elem.style.display = 'none';
         });
         ElemEror.style.display = 'block';
         erorCity.textContent = inpCITY;
         return;
      }
      else {
         document.querySelectorAll(".boxWith_information").forEach(elem => {
            elem.style.display = 'block';
         });
         ElemEror.style.display = 'none';
      }

      cityName.textContent = inpCITY;

      curentTime.textContent = getDay();

      let i = 1;

      while (true) {
         const gridItem = document.getElementById(`gridElem${i}`);

         switch (true) {
            case (i >= 1 && i <= 6):
               gridItem.textContent = `${data.list[i - 1].dt_txt.slice(11, 16)} h`;
               break;
            case (i >= 7 && i <= 12):
               gridItem.src = `https://openweathermap.org/img/wn/${data.list[i - 7].weather[0].icon}.png`;
               break;
            case (i >= 13 && i <= 18):
               gridItem.textContent = `${data.list[i - 13].weather[0].main}`;
               break;
            case (i >= 19 && i <= 24):
               gridItem.textContent = `${data.list[i - 19].main.temp}°`;
               break;
            case (i >= 25 && i <= 30):
               gridItem.textContent = `${data.list[i - 25].main.feels_like}°`;
               break;
            case (i >= 31 && i <= 36):
               gridItem.textContent = data.list[i - 31].wind.speed;
               break;
            default:
               break;
         }

         i++;

         if (i > 36) {
            break;
         }
      }

      curTempImg.src = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png`;
      curWeather.textContent = data.list[0].weather[0].main;
      curTemp.textContent = `Real: ${data.list[0].main.temp.toFixed(1)}°С`;
      feelTemp.textContent = `Feel like: ${data.list[0].main.feels_like.toFixed(1)}°С`;

      if (counter == 1) {
         document.querySelectorAll("#ElemEror").forEach(elem => {
            elem.style.background = "rgb(165, 165, 165)";
         });
      }
   })
}

function getDay() {
   let today = new Date();
   let day = today.getDate();
   let month = today.getMonth() + 1;
   let year = today.getFullYear();

   let currentDate = `${day}.${month}.${year}`;
   return currentDate;
}

let counter = 0;

function changeColor() {
   if (counter == 0) {
      document.querySelector("header").style.background = "rgb(150,150,150)";
      document.querySelector("body").style.background = "rgb(185,185,185)";
      document.querySelectorAll(".Elem").forEach(elem => {
         elem.style.background = "rgb(165, 165, 165)";
      });
      document.querySelector(".Elem3").style.background = "rgb(185,185,185)";

      counter = 1;
   }
   else if (counter == 1) {
      document.querySelector("header").style.background = "#ffffff";
      document.querySelector("body").style.background = "#f5f5f5";
      document.querySelectorAll(".Elem").forEach(elem => {
         elem.style.background = "rgb(210, 210, 210)";
      });
      document.querySelector(".Elem3").style.background = "rgb(210, 210, 210)";

      counter = 0;
   }
}

function convertMonth(dateString) {
   const month = new Date(dateString).getMonth();
   const MonthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
   return MonthNames[month];
}
function convertDay(dateString) {
   const dayOfWeek = new Date(dateString).getDay();
   const daysOfWeekNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
   return daysOfWeekNames[dayOfWeek];
}

function forecastDay5() {
   let city;
   if (inpCity.value.trim() == "") {
      city = "Dubai";
   }
   else {
      city = inpCity.value.trim();
   }
   const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

   fetch(url).then((response) => response.json()).then((data) => {
      let temp = '';

      for (i = 0, j = 0; i < 5; i++, j += 8) {
         temp += `
      <div class="days5Itemm" id="Days5Item${i + 1}" onclick="ShowSelectedDay(${i + 1})">
          <div class="weekDay">${convertDay(data.list[j].dt_txt)}</div>
          <div class="monthDay">${convertMonth(data.list[j].dt_txt)} ${new Date(data.list[j].dt_txt).getDate()}</div>
          <div><img class="iconDay" src="https://openweathermap.org/img/wn/${data.list[j].weather[0].icon}.png"></div>
          <div class="tempDay">${data.list[j].main.temp}℃</div>
          <div class="weatherDay">${data.list[j].weather[0].main}</div>
      </div>
      `;
      }

      let Elem3 = document.querySelector('.Elem3');
      Elem3.innerHTML = temp;

      document.getElementById("Days5Item1").style.background = "rgb(185, 185, 185)";
   })
}

function ShowSelectedDay(selected_day) {
   let city;
   if (inpCity.value.trim() == "") {
      city = "Dubai";
   }
   else {
      city = inpCity.value.trim();
   }
   const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

   fetch(url).then((response) => response.json()).then((data) => {

      switch (selected_day) {
         case 1:

            let i = 1;

            while (true) {
               const gridItem = document.getElementById(`gridElem${i}`);

               switch (true) {
                  case (i >= 1 && i <= 6):
                     gridItem.textContent = `${data.list[i - 1].dt_txt.slice(11, 16)} h`;
                     break;
                  case (i >= 7 && i <= 12):
                     gridItem.src = `https://openweathermap.org/img/wn/${data.list[i - 7].weather[0].icon}.png`;
                     break;
                  case (i >= 13 && i <= 18):
                     gridItem.textContent = `${data.list[i - 13].weather[0].main}`;
                     break;
                  case (i >= 19 && i <= 24):
                     gridItem.textContent = `${data.list[i - 19].main.temp}°`;
                     break;
                  case (i >= 25 && i <= 30):
                     gridItem.textContent = `${data.list[i - 25].main.feels_like}°`;
                     break;
                  case (i >= 31 && i <= 36):
                     gridItem.textContent = data.list[i - 31].wind.speed;
                     break;
                  default:
                     break;
               }

               i++;

               if (i > 36) {
                  break;
               }
            }

            document.getElementById("Days5Item1").style.background = "rgb(185, 185, 185)";
            document.getElementById("Days5Item2").style.background = "rgb(210, 210, 210)";
            document.getElementById("Days5Item3").style.background = "rgb(210, 210, 210)";
            document.getElementById("Days5Item4").style.background = "rgb(210, 210, 210)";
            document.getElementById("Days5Item5").style.background = "rgb(210, 210, 210)";
            break;
         case 2:
            for (let i = 1; i <= 36; i++) {
               const gridItem = document.getElementById(`gridElem${i}`);

               switch (true) {
                  case i >= 1 && i <= 6:
                     gridItem.textContent = `${data.list[i - (-7)].dt_txt.slice(11, 16)} h`;
                     break;
                  case i >= 7 && i <= 12:
                     gridItem.src = `https://openweathermap.org/img/wn/${data.list[i - (-1)].weather[0].icon}.png`;
                     break;
                  case i >= 13 && i <= 18:
                     gridItem.textContent = `${data.list[i - 5].weather[0].main}`;
                     break;
                  case i >= 19 && i <= 24:
                     gridItem.textContent = `${data.list[i - 11].main.temp}°`;
                     break;
                  case i >= 25 && i <= 30:
                     gridItem.textContent = `${data.list[i - 17].main.feels_like}°`;
                     break;
                  case i >= 31 && i <= 36:
                     gridItem.textContent = data.list[i - 23].wind.speed;
                     break;
                  default:
                     break;
               }
            }

            document.getElementById("Days5Item1").style.background = "rgb(210, 210, 210)";
            document.getElementById("Days5Item2").style.background = "rgb(185, 185, 185)";
            document.getElementById("Days5Item3").style.background = "rgb(210, 210, 210)";
            document.getElementById("Days5Item4").style.background = "rgb(210, 210, 210)";
            document.getElementById("Days5Item5").style.background = "rgb(210, 210, 210)";
            break;
         case 3:
            for (let i = 1; i <= 36; i++) {
               const gridItem = document.getElementById(`gridElem${i}`);

               switch (true) {
                  case i >= 1 && i <= 6:
                     gridItem.textContent = `${data.list[i - (-15)].dt_txt.slice(11, 16)} h`;
                     break;
                  case i >= 7 && i <= 12:
                     gridItem.src = `https://openweathermap.org/img/wn/${data.list[i - (-9)].weather[0].icon}.png`;
                     break;
                  case i >= 13 && i <= 18:
                     gridItem.textContent = `${data.list[i - (-3)].weather[0].main}`;
                     break;
                  case i >= 19 && i <= 24:
                     gridItem.textContent = `${data.list[i - 3].main.temp}°`;
                     break;
                  case i >= 25 && i <= 30:
                     gridItem.textContent = `${data.list[i - 9].main.feels_like}°`;
                     break;
                  case i >= 31 && i <= 36:
                     gridItem.textContent = data.list[i - 15].wind.speed;
                     break;
                  default:
                     break;
               }
            }

            document.getElementById("Days5Item1").style.background = "rgb(210, 210, 210)";
            document.getElementById("Days5Item2").style.background = "rgb(210, 210, 210)";
            document.getElementById("Days5Item3").style.background = "rgb(185, 185, 185)";
            document.getElementById("Days5Item4").style.background = "rgb(210, 210, 210)";
            document.getElementById("Days5Item5").style.background = "rgb(210, 210, 210)";
            break;
         case 4:
            for (let i = 1; i <= 36; i++) {
               const gridItem = document.getElementById(`gridElem${i}`);

               switch (true) {
                  case i >= 1 && i <= 6:
                     gridItem.textContent = `${data.list[i - (-23)].dt_txt.slice(11, 16)} h`;
                     break;
                  case i >= 7 && i <= 12:
                     gridItem.src = `https://openweathermap.org/img/wn/${data.list[i - (-17)].weather[0].icon}.png`;
                     break;
                  case i >= 13 && i <= 18:
                     gridItem.textContent = `${data.list[i - (-11)].weather[0].main}`;
                     break;
                  case i >= 19 && i <= 24:
                     gridItem.textContent = `${data.list[i - (-5)].main.temp}°`;
                     break;
                  case i >= 25 && i <= 30:
                     gridItem.textContent = `${data.list[i - 1].main.feels_like}°`;
                     break;
                  case i >= 31 && i <= 36:
                     gridItem.textContent = data.list[i - 7].wind.speed;
                     break;
                  default:
                     break;
               }
            }

            document.getElementById("Days5Item1").style.background = "rgb(210, 210, 210)";
            document.getElementById("Days5Item2").style.background = "rgb(210, 210, 210)";
            document.getElementById("Days5Item3").style.background = "rgb(210, 210, 210)";
            document.getElementById("Days5Item4").style.background = "rgb(185, 185, 185)";
            document.getElementById("Days5Item5").style.background = "rgb(210, 210, 210)";
            break;
         case 5:
            for (let i = 1; i <= 36; i++) {
               const gridItem = document.getElementById(`gridElem${i}`);

               switch (true) {
                  case i >= 1 && i <= 6:
                     gridItem.textContent = `${data.list[i - (-31)].dt_txt.slice(11, 16)} h`;
                     break;
                  case i >= 7 && i <= 12:
                     gridItem.src = `https://openweathermap.org/img/wn/${data.list[i - (-25)].weather[0].icon}.png`;
                     break;
                  case i >= 13 && i <= 18:
                     gridItem.textContent = `${data.list[i - (-19)].weather[0].main}`;
                     break;
                  case i >= 19 && i <= 24:
                     gridItem.textContent = `${data.list[i - (-13)].main.temp}°`;
                     break;
                  case i >= 25 && i <= 30:
                     gridItem.textContent = `${data.list[i - (-7)].main.feels_like}°`;
                     break;
                  case i >= 31 && i <= 36:
                     gridItem.textContent = data.list[i - 0].wind.speed;
                     break;
                  default:
                     break;
               }
            }

            document.getElementById("Days5Item1").style.background = "rgb(210, 210, 210)";
            document.getElementById("Days5Item2").style.background = "rgb(210, 210, 210)";
            document.getElementById("Days5Item3").style.background = "rgb(210, 210, 210)";
            document.getElementById("Days5Item4").style.background = "rgb(210, 210, 210)";
            document.getElementById("Days5Item5").style.background = "rgb(185, 185, 185)";
            break;
      }
   })
}