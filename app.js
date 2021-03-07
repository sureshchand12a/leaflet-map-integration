const map = L.map('map').setView([27.70085, 85.31523], 17);
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const attribution =
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Coded by coder\'s gyan with ❤️';
const tileLayer = L.tileLayer(tileUrl, { attribution });
tileLayer.addTo(map);


//cover areas
const latlngs = [
    [27.70220, 85.3138],
    [27.70012, 85.31363],
    [27.70002, 85.31370],
    [27.69978, 85.31466],
    [27.69983, 85.31479],
    [27.69986, 85.31500],
    [27.69981, 85.31518],
    [27.69963, 85.31531],
    [27.69950, 85.31622],
    [27.69954, 85.31631],
    [27.69971, 85.31631],
    [27.69988, 85.31647],
    [27.70213, 85.31637]
]

const polygon = L.polygon(latlngs, {color: '#009a88'}).addTo(map);
polygon.on('click', function(){
    const areaObj = {
        "properties": {
          "name": "Tundikhel Army Barrack",
          "address": "Tundikhel, Darbar Marg, Bhotahity, Baghbazar, Kathmandu, Bagmati Pradesh, PO BOX. 220, Nepal",
          "link": "barrack.html"
        }
    }
    polygon.bindPopup(makpopContainerArea(areaObj));
});
map.fitBounds(polygon.getBounds());


var icon = L.icon({
    iconUrl: 'marker.png',
    iconSize: [30, 30]
});

const makpopContainer = (barrack) => {
    return `
        <div>
            <h4>${barrack.properties.name}</h4>
            <p>${barrack.properties.address}</p>
            <div class="phone-number">
                <a href="tel:${barrack.properties.phone}">${barrack.properties.phone}</a>
            </div>
        </div>
    `;
}

const makpopContainerArea = (barrack) => {
    return `
        <div>
            <h4>${barrack.properties.name}</h4>
            <p>${barrack.properties.address}</p>
            <div class="phone-number">
                <a target="_blank" href="${barrack.properties.link}">All Barracks</a>
            </div>
        </div>
    `;
}

const onEachBarrack = (barrack, layer) => {
    layer.bindPopup(makpopContainer(barrack));
}

const barrackLayers = L.geoJSON(barrackList, {
    onEachFeature : onEachBarrack,
    pointToLayer : (feature, latlng) => {
        return L.marker(latlng, { icon: icon });
    }
}).addTo(map);;