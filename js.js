var url = "https://api.coinmarketcap.com/v1/ticker/";
var strResult = "";

$.getJSON(url, function (data) {

    data.sort(function (a, b) {
        return b.price_usd - a.price_usd;
    });

    strResult += "<h1 class='text-center'>Cryptocurrency Tracker</h1>";
    strResult += "<p class='text-center'><a href='http://www.alexytlee.com/' target='_blank'>www.alexytlee.com</a></p>";
    strResult += "<table width ='100%' class='table table-condensed table-hover'>";
    strResult += "<tr><th>Rank</th><th>Name</th><th>Price (USD)</th><th>Market Cap</th><th>Available Supply</th><th>Total Supply</th><th>1H &Delta;</th><th>24H &Delta;</th><th>7D &Delta;</th><th>Last Updated</th></tr>"

    for (var i = 0; i < data.length; i++) {
        strResult += "<tr><td>" + (i + 1) + "</td>";
        strResult += "<td>" + data[i].name + "</td>";
        strResult += "<td>$" + parseFloat(data[i].price_usd).toFixed(2) + "</td>";
        strResult += "<td>$" + data[i].market_cap_usd.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "</td>";
        strResult += "<td>" + data[i].available_supply.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "</td>";
        strResult += "<td>" + data[i].total_supply.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "</td>"

        if (data[i].percent_change_1h < 0) {
            strResult += "<td><span class='bg-danger text-white'>" + data[i].percent_change_1h + "%</span></td>";
        } else {
            strResult += "<td>" + data[i].percent_change_1h + "%</td>";
        }

        if (data[i].percent_change_24h < 0) {
            strResult += "<td><span class='bg-danger text-white'>" + data[i].percent_change_24h + "%</span></td>";
        } else {
            strResult += "<td>" + data[i].percent_change_24h + "%</td>"
        }

        if (data[i].percent_change_7d < 0) {
            strResult += "<td><span class='bg-danger text-white'>" + data[i].percent_change_7d + "%</span></td>";
        } else {
            strResult += "<td>" + data[i].percent_change_7d + "%</td>"
        }

        var date = new Date(data[i].last_updated * 1000);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var seconds = "0" + date.getSeconds();
        var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)

        strResult += "<td>" + formattedTime + "</td></tr>"
    }

    strResult += "</table>";
    $("#divResult").html(strResult);
});