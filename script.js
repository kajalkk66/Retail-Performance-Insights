const palette = ['#6878ed','#34b58a','#f1a45d','#9b7be8','#54a9c8','#e47d91'];

Chart.defaults.font.family = "'DM Sans', sans-serif";
Chart.defaults.color = '#8792a5';
Chart.defaults.plugins.legend.labels.usePointStyle = true;
Chart.defaults.plugins.legend.labels.boxWidth = 8;
Chart.defaults.plugins.legend.labels.padding = 16;

function barChart(id, labels, values, horizontal=false, color='#6878ed') {
  const el = document.getElementById(id);
  if (!el) return;
  new Chart(el, {
    type: 'bar',
    data: { labels, datasets: [{ data: values, backgroundColor: labels.map((_,i)=>palette[i%palette.length]), borderRadius: 6, maxBarThickness: 27 }] },
    options: {
      indexAxis: horizontal ? 'y' : 'x',
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { callbacks: { label: c => ` ${c.raw}M` } } },
      scales: {
        x: { grid: { display: !horizontal, color: '#f0f2f6' }, border: {display:false}, ticks: {font:{size:10}} },
        y: { grid: { display: horizontal, color: '#f0f2f6' }, border: {display:false}, ticks: {font:{size:10}} }
      }
    }
  });
}
function doughnutChart(id, labels, values) {
  const el=document.getElementById(id); if(!el)return;
  new Chart(el,{type:'doughnut',data:{labels,datasets:[{data:values,backgroundColor:palette,borderWidth:0,hoverOffset:5}]},options:{responsive:true,maintainAspectRatio:false,cutout:'65%',plugins:{legend:{position:'bottom',labels:{font:{size:10},padding:13}},tooltip:{callbacks:{label:c=>` ${c.label}: ${c.raw}M`}}}}});
}

barChart('categoryChart',['Electronics','Home Appliances','Clothing','Beauty','Grocery'],[177,40,18,8,5],true);
barChart('salesCategoryChart',['Electronics','Home Appliances','Clothing','Beauty','Grocery'],[177,40,18,8,5],false);
barChart('profitCategoryChart',['Electronics','Home Appliances','Clothing','Beauty','Grocery'],[31.9,7,3.2,1.4,1],false);
barChart('stateChart',['Uttar Pradesh','Maharashtra','West Bengal','Rajasthan','Telangana'],[41,40,21,20,19],true);
barChart('cityChart',['Indore','Delhi','Ahmedabad','Kanpur','Mumbai','Kolkata','Lucknow'],[22.7,22.5,21,21,20.8,20.6,20.5],true);
barChart('productChart',['Headphones','Smartphone','Laptop','Smartwatch','Vacuum Cleaner'],[49,44,43,42,11],true);
doughnutChart('paymentChart',['Cash','Credit Card','Debit Card','UPI','Net Banking'],[54,50,50,47,46]);
barChart('storeChart',['Convenience Store','Hypermarket','Supermarket','Department Store'],[63,62,62,60],true);
doughnutChart('segmentSalesChart',['Regular','Premium','New'],[149.2,51.5,47]);
doughnutChart('segmentProfitChart',['Regular','Premium','New'],[26.7,9.3,8.4]);

// Highlight the navigation item for the section currently being viewed.
const links = [...document.querySelectorAll('.nav-link')];
const sections = links.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    }
  });
}, {rootMargin:'-25% 0px -65% 0px'});
sections.forEach(section => observer.observe(section));
