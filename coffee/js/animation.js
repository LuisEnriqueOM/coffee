let productos = JSON.parse(localStorage.getItem("productos"));
    
for(let producto of productos){

let card1 = document.getElementById(`card${producto.id}`);
//console.log(card1);
card1.addEventListener("mouseover",() => {card1.className="card shadow-sm cardAnimation"});
card1.addEventListener("mouseout",()=> {card1.className="card shadow-sm"});
}
