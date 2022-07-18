//get value for all input
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let search = document.getElementById("search");
let parent_total = document.getElementById("parent_total");
let create = document.getElementById("create");
let ubdateitem = document.getElementById("ubdate");
let tablebody = document.getElementById("tablebody");
let div_delete_all = document.getElementById("div_delete_all");
let delete_all = document.getElementById("delete_all");

//select mode create or ubdate
let mode = "create";
//variable to index ubdate
let index_ubdate;
//variable mode search title or category
let mode_search = "title";

//get total
function getTotal() {
  if (price.value != "") {
    let total_result =
      +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = total_result;
    parent_total.style.backgroundColor = "green";
  } else {
    total.innerHTML = "";
    parent_total.style.backgroundColor = "red";
  }
}
getTotal();

//create data and save in localStorage
let dataprudct; //SAVE DATA IN ARRAY from OBJECT (NEWPRUDUCT)

// if localStorage is not null , dataprudct =localStorage.pruduct else  dataprudct = [];
if (localStorage.pruduct != null) {
  dataprudct = JSON.parse(localStorage.pruduct);
} else {
  dataprudct = [];
}

create.addEventListener("click", function () {
  if (
    title.value &&
    price.value &&
    taxes.value &&
    ads.value &&
    category.value != ""
  ) {
    //crate object for one product
    let newproduct = {
      title: title.value,
      price: price.value,
      taxes: taxes.value,
      ads: ads.value,
      discount: discount.value,
      total: total.innerHTML,
      count: count.value,
      category: category.value,
    };

    // select  count  data
    if (mode === "create") {
      if (newproduct.count > 1) {
        for (let index = 0; index < newproduct.count; index++) {
          dataprudct.push(newproduct);
        }
      } else {
        dataprudct.push(newproduct);
      }
    } else {
      dataprudct[index_ubdate] = newproduct;
      mode = "create";
      count.style.display = "block";
      create.value = "Create";
    }

    localStorage.setItem("pruduct", JSON.stringify(dataprudct));
  } else {
    swal("Please... enter all data");
  }

  // clear data from inputs
  cleardatainput();
  //get all data from localStorage and show in table
  showealldata();
});

// clear data from inputs
function cleardatainput() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

//get all data from localStorage and show in table
function showealldata() {
  let table = "";
  dataprudct.forEach((element, index) => {
    table += `<tr>
          <td>${index + 1}</td>
          <td>${element.title}</td>
          <td>${element.price}</td>
          <td>${element.taxes}</td>
          <td>${element.ads}</td>
          <td>${element.total}</td>
          <td>${element.category}</td>
          <td><input  onclick="ubdateitemonclick(${index})" class="  text-center text-light p-1 " id="ubdate" type="submit" value="Ubdate"></td>
          <td><input onclick="deleteitem(${index})" class="  text-center text-light p-1 " id="delete" type="submit" value="Delete"></td>
    </tr>`;
  });

  tablebody.innerHTML = table;

  // if localStorage is not empty
  if (dataprudct.length > 0) {
    let btndeleteall = `<input onclick="deleteAllitem()" class=" button text-center text-light p-1 " id="delete_all" type="submit" value="Delete all (${dataprudct.length})">`;
    div_delete_all.innerHTML = btndeleteall;
  } else {
    div_delete_all.innerHTML = "";
  }

  getTotal();
}

showealldata();

//delete  item when click delete button

function deleteitem(index) {
  dataprudct.splice(index, 1);
  localStorage.pruduct = JSON.stringify(dataprudct);
  showealldata();
}

//delete all item when click delete all button

///on clic delete all
function deleteAllitem() {
  dataprudct.splice(0);
  localStorage.clear();
  showealldata();
}

// ubdate data when click button ubdate

function ubdateitemonclick(index) {
  title.value = dataprudct[index].title;
  price.value = dataprudct[index].price;
  taxes.value = dataprudct[index].taxes;
  ads.value = dataprudct[index].ads;
  discount.value = dataprudct[index].discount;
  //get total
  getTotal();
  count.style.display = "none";
  category.value = dataprudct[index].category;
  create.value = "Ubdate";

  //change mode to ubdate
  mode = "ubdate";
  // set index to index_ubdate
  index_ubdate = index;
  //scrole when item in click ubdate button
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

//search for item in data

function searchitem(id) {
  if (id === "search_titele") {
    mode_search = "title";
    search.placeholder = "search by title";
  } else {
    mode_search = "category";
    search.placeholder = "search by category";
  }
  search.focus();
  search.value = "";
  showealldata();
}

function unfocus() {
  search.placeholder = "search";
}

function search_data(value) {
  let table = "";

  if (mode_search == "title") {
    dataprudct.forEach((element, index) => {
      if (dataprudct[index].title.toLowerCase().includes(value)) {
        table += `<tr>
                <td>${index}</td>
                <td>${element.title}</td>
                <td>${element.price}</td>
                <td>${element.taxes}</td>
                <td>${element.ads}</td>
                <td>${element.total}</td>
                <td>${element.category}</td>
                <td><input  onclick="ubdateitemonclick(${index})" class="  text-center text-light p-1 " id="ubdate" type="submit" value="Ubdate"></td>
                <td><input onclick="deleteitem(${index})" class="  text-center text-light p-1 " id="delete" type="submit" value="Delete"></td>
          </tr>`;
      }
    });
  } else {
    dataprudct.forEach((element, index) => {
      if (dataprudct[index].category.toLowerCase().includes(value)) {
        table += `<tr>
                <td>${index}</td>
                <td>${element.title}</td>
                <td>${element.price}</td>
                <td>${element.taxes}</td>
                <td>${element.ads}</td>
                <td>${element.total}</td>
                <td>${element.category}</td>
                <td><input  onclick="ubdateitemonclick(${index})" class="  text-center text-light p-1 " id="ubdate" type="submit" value="Ubdate"></td>
                <td><input onclick="deleteitem(${index})" class="  text-center text-light p-1 " id="delete" type="submit" value="Delete"></td>
          </tr>`;
      }
    });
  }
  tablebody.innerHTML = table;
}
