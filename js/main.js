 

 const elForm = document.querySelector(".js-form");
 const elInpTitle = document.querySelector(".js-inp-title");
 const elInpyear = document.querySelector(".js-inp-year");
 const elInpAuthor = document.querySelector(".js-inp-author");
 const elBookmarkSort = document.querySelector(".js-sort-bookmark"); 


 const elList = document.querySelector(".js-list");
 const elBookmarkList = document.querySelector(".bookmarl-list");

 const bookArry = []; 

 function sortBookmark(arry, sortbook){ 

     if(sortbook == "A-z"){ 

          arry.sort((a, b) => { 

             const textA = a.title.toUpperCase();
             const textB = b.title.toUpperCase();

             if(textA > textB){ 

               return 1
             }else if(textA < textB){ 

               return -1
             }else{ 

               return 0;
             }

          })
     };
     
     if(sortbook == "Z-a"){ 

      arry.sort((z, d) => { 

         const textZ = z.title.toUpperCase();
         const textD = d.title.toUpperCase();

         if(textZ < textD){ 

           return 1
         }else if(textZ > textD){ 

           return -1
         }else{ 

           return 0;
         }

      })
     }; 

     if(sortbook == "Star-year"){ 

        arry.sort((e, r) => { 

          const yearE = Math.floor(e.year);
          const yearR = Math.floor(r.year);

          if(yearE > yearR){ 

            return 1;
          }else if(yearE < yearR){ 

            return -1;
          }else{ 

            return 0;
          }

        })

     };

     if(sortbook == "End-year"){ 

      arry.sort((y, u) => { 

        const yearY = Math.floor(y.year);
        const yearU = Math.floor(u.year);

        if(yearY < yearU){ 

          return 1;
        }else if(yearY > yearU){ 

          return -1;
        }else{ 

          return 0;
        }

      })

    };
    

   if(sortbook == "Few-sheets"){ 

       arry.sort((n, v) => { 
          
         const textN = n.author.toUpperCase();
         const textV = v.author.toUpperCase();

         if(textN > textV){ 

            return 1;
         }else if(textN < textV){ 

            return -1;
         }else{ 

            return 0;
         }

       })
   }; 

   if(sortbook == "Many-sheets"){  

      arry.sort((h, m) => { 
         
        const textH = h.author.toUpperCase();
        const textM = m.author.toUpperCase();

        if(textH < textM){ 

           return 1;
        }else if(textH > textM){ 

           return -1;
        }else{ 

           return 0;
        }

      })
   };
     
 };
  

  const rederBookmark = function(book, regeh = ""){
     
    const elTempleList = document.querySelector(".js-template").content;
    const elFragment = document.createDocumentFragment();
    
    elList.innerHTML = "";

    book.forEach(item => {
         
       let newItem = elTempleList.cloneNode(true); 
       newItem.querySelector(".item-img").src = item.imageLink;  

       if(regeh.source != "(?:)" && regeh){ 

         newItem.querySelector(".item-title").innerHTML = item.title.slice(0, 20).replace(regeh, `<mark class="text-bg-warning rounded-2"> 
        ${ 
                  regeh.source.toLowerCase() 
         } </mark>`);
          
       }else{ 

         newItem.querySelector(".item-title").textContent = item.title.slice(0, 20);

       }
       
       newItem.querySelector(".item-author").textContent = item.author.slice(0, 20);
       newItem.querySelector(".item-year").textContent = Math.abs(item.year);
       newItem.querySelector(".item-pages").textContent = item.pages;
       newItem.querySelector(".item-language").textContent = item.language;
       newItem.querySelector(".item-link").href = item.link;
       newItem.querySelector(".item-country").textContent = item.country.slice(0, 10);
       newItem.querySelector(".js-star-border").dataset.dataStarId = item.title;
       newItem.querySelector(".js-star").dataset.dataStarId = item.title;
       
      
       elFragment.appendChild(newItem);

    }); 

    elList.appendChild(elFragment);

 };  

 const rederBookmarkList = function(book, node){
     
   const elTempleList = document.querySelector(".js-template").content;
   const elFragment = document.createDocumentFragment();
   
   elBookmarkList.innerHTML = "";

   book.forEach((item, index) => {
        
      let newItem = elTempleList.cloneNode(true);

      newItem.querySelector(".item-img").src = item.imageLink;
      newItem.querySelector(".item-title").textContent = item.title.slice(0, 20);
      newItem.querySelector(".item-author").textContent = item.author.slice(0, 20);
      newItem.querySelector(".item-year").textContent = Math.abs(item.year);
      newItem.querySelector(".item-pages").textContent = item.pages;
      newItem.querySelector(".item-language").textContent = item.language;
      newItem.querySelector(".item-link").href = item.link;
      newItem.querySelector(".item-country").textContent = item.country.slice(0, 10);
      newItem.querySelector(".js-star-border").classList.add("d-none"); 
      newItem.querySelector(".js-dalet-btn").classList.remove("d-none");
      newItem.querySelector(".js-dalet-btn").dataset.dataStarId = index;
      newItem.querySelector(".js-star").classList.remove("d-none");
      
      elFragment.appendChild(newItem);
   }); 

   node.appendChild(elFragment);

};


 elList.addEventListener("click", function(evt){ 

      
   if(evt.target.matches(".js-star-border")){ 

      const starBorderId = evt.target.dataset.dataStarId;
      const addBookmarkId = books.find(item => item.title === starBorderId);

      if(!bookArry.includes(addBookmarkId)){ 

         bookArry.push(addBookmarkId);
         rederBookmarkList(bookArry, elBookmarkList);
         
      }  
   }

 });


 elBookmarkList.addEventListener("click", function(evt){ 

     if(evt.target.matches(".js-dalet-btn")){ 


          const daletBtn = evt.target.dataset.dataStarId;

          bookArry.splice(daletBtn, 1);

          rederBookmarkList(bookArry, elBookmarkList);
     };

 });
 

 elForm.addEventListener("submit", function(evt){ 

    evt.preventDefault();
   
    const inpValue = elInpTitle.value.trim();
    const inpValuAuthor = elInpAuthor.value.trim();

    const regehtTitle = new RegExp(inpValue, "gi");
    const regehtAuthor = new RegExp(inpValuAuthor, "gi")

       const nameFilter = books.filter(item => { 

     const nameRegeh = item.title.match(regehtTitle) && (elInpyear.value == "" || item.year >= elInpyear.value) && (elInpyear.value == "" || item.year <= elInpyear.value) && (item.author.match(regehtAuthor));
     
       return nameRegeh
    }); 

     if(nameFilter.length > 0){  

      sortBookmark(nameFilter, elBookmarkSort.value);
      rederBookmark(nameFilter, regehtTitle);
     }else{ 

      elList.innerHTML = "Bookmark not fount"

     };

 });

 rederBookmark(books);