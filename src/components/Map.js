import React, { useState, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import ChangeView from "./ChangeView"
import RestaurantSearchResult from "./RestaurantSearchResult";

const data = `10001,40.750633, -73.997177
10002,40.715775, -73.986212
10003,40.731829, -73.989181
10004,40.688630, -74.018244
10005,40.706027, -74.008835
10006,40.709614, -74.012954
10007,40.713848, -74.007755
10009,40.726399, -73.978631
10010,40.739065, -73.982255
10011,40.742039, -74.000620
10012,40.725581, -73.998078
10013,40.720103, -74.004903
10014,40.734012, -74.006746
10016,40.745224, -73.978297
10017,40.752360, -73.972493
10018,40.755319, -73.993114
10019,40.765823, -73.987169
10020,40.758236, -73.978833
10021,40.769258, -73.958751
10022,40.758628, -73.967948
10023,40.775921, -73.982607
10024,40.798452, -73.974428
10025,40.798601, -73.966622
10026,40.802381, -73.952681
10027,40.811407, -73.953060
10028,40.776441, -73.953509
10029,40.791763, -73.943970
10030,40.818267, -73.942856
10031,40.825288, -73.950045
10032,40.838815, -73.942836
10033,40.850545, -73.933983
10034,40.867076, -73.924312
10035,40.795455, -73.929655
10036,40.759260, -73.989860
10037,40.812957, -73.937376
10038,40.709278, -74.002562
10039,40.830867, -73.936218
10040,40.858305, -73.930549
10044,40.761915, -73.949962
10065,40.764612, -73.963122
10069,40.775906, -73.990358
10075,40.773361, -73.956216
10103,40.760780, -73.977670
10110,40.754499, -73.982256
10111,40.759114, -73.977596
10112,40.759167, -73.979668
10115,40.810852, -73.963744
10119,40.750310, -73.992979
10128,40.781432, -73.950013
10152,40.758404, -73.972031
10153,40.763622, -73.972439
10154,40.757779, -73.972487
10162,40.769300, -73.949915
10165,40.752131, -73.978722
10167,40.754648, -73.974771
10168,40.751448, -73.977103
10169,40.754391, -73.976098
10170,40.752625, -73.975877
10171,40.755899, -73.973858
10172,40.755273, -73.974315
10173,40.754131, -73.979364
10174,40.751441, -73.975003
10177,40.755139, -73.975934
10199,40.751393, -73.997229
10271,40.708205, -74.010504
10278,40.715182, -74.003778
10279,40.712626, -74.008669
10280,40.708538, -74.016650
10282,40.716921, -74.015066
10301,40.627456, -74.094407
10302,40.630688, -74.137776
10303,40.629885, -74.174130
10304,40.609227, -74.092575
10305,40.596691, -74.074866
10306,40.571768, -74.125950
10307,40.509183, -74.237785
10308,40.551884, -74.147646
10309,40.531346, -74.219857
10310,40.632648, -74.116148
10311,40.605241, -74.179503
10312,40.545237, -74.180443
10314,40.599263, -74.165748
10451,40.820479, -73.925084
10452,40.837393, -73.923437
10453,40.852779, -73.912332
10454,40.805489, -73.916585
10455,40.814710, -73.908593
10456,40.829881, -73.908120
10457,40.847150, -73.898680
10458,40.862543, -73.888143
10459,40.825867, -73.892942
10460,40.841758, -73.879571
10461,40.847381, -73.840584
10462,40.843280, -73.860389
10463,40.880678, -73.906540
10464,40.867787, -73.799920
10465,40.822615, -73.822239
10466,40.890964, -73.846239
10467,40.869953, -73.865746
10468,40.868093, -73.899730
10469,40.868607, -73.848133
10470,40.889530, -73.872662
10471,40.898868, -73.903328
10472,40.829556, -73.869336
10473,40.818690, -73.858474
10474,40.810549, -73.884367
10475,40.875169, -73.823817
11004,40.746204, -73.711478
11005,40.756596, -73.714178
11010,40.700587, -73.675018
11020,40.771442, -73.714819
11021,40.784319, -73.731488
11023,40.798909, -73.733653
11024,40.816251, -73.742872
11030,40.793409, -73.688549
11040,40.745347, -73.680292
11042,40.758534, -73.697235
11050,40.839900, -73.693124
11096,40.621346, -73.756990
11101,40.747155, -73.939750
11102,40.772884, -73.926295
11103,40.762574, -73.913447
11104,40.744634, -73.920201
11105,40.778877, -73.906769
11106,40.762211, -73.931528
11109,40.745115, -73.956928
11201,40.693682, -73.989693
11203,40.649591, -73.934371
11204,40.618779, -73.984826
11205,40.694696, -73.966286
11206,40.701954, -73.942358
11207,40.670747, -73.894209
11208,40.669769, -73.871372
11209,40.621982, -74.030324
11210,40.628147, -73.946324
11211,40.712597, -73.953098
11212,40.662936, -73.913029
11213,40.671078, -73.936336
11214,40.599148, -73.996090
11215,40.662688, -73.986740
11216,40.680768, -73.949316
11217,40.682306, -73.978099
11218,40.643468, -73.976046
11219,40.632667, -73.996669
11220,40.641221, -74.016862
11221,40.691340, -73.927879
11222,40.727790, -73.947605
11223,40.597139, -73.973428
11224,40.577372, -73.988706
11225,40.663046, -73.954219
11226,40.646448, -73.956649
11228,40.616695, -74.013047
11229,40.601293, -73.944493
11230,40.622164, -73.965105
11231,40.677916, -74.005154
11232,40.656546, -74.007355
11233,40.678308, -73.919936
11234,40.605080, -73.911721
11235,40.583949, -73.949096
11236,40.639413, -73.900664
11237,40.704160, -73.921139
11238,40.679171, -73.963804
11239,40.647735, -73.879477
11351,40.780747, -73.825301
11354,40.768208, -73.827403
11355,40.751452, -73.821031
11356,40.784850, -73.841279
11357,40.786393, -73.810864
11358,40.760471, -73.796371
11359,40.791781, -73.776875
11360,40.780379, -73.781230
11361,40.764191, -73.772775
11362,40.756574, -73.737845
11363,40.772616, -73.746526
11364,40.745289, -73.760586
11365,40.739634, -73.794490
11366,40.728152, -73.785019
11367,40.730145, -73.827030
11368,40.751718, -73.851822
11369,40.763365, -73.872374
11370,40.765393, -73.893243
11371,40.773894, -73.873475
11372,40.751690, -73.883638
11373,40.738837, -73.878535
11374,40.726418, -73.861526
11375,40.720934, -73.846151
11377,40.744819, -73.905156
11378,40.724744, -73.909639
11379,40.716748, -73.879601
11385,40.700671, -73.889433
11411,40.694021, -73.736216
11412,40.698095, -73.758986
11413,40.671659, -73.752568
11414,40.657604, -73.844804
11415,40.707917, -73.828212
11416,40.684654, -73.849548
11417,40.676446, -73.844443
11418,40.700272, -73.835971
11419,40.688673, -73.822918
11420,40.673583, -73.817730
11421,40.694062, -73.858626
11422,40.660060, -73.736012
11423,40.715606, -73.768471
11424,40.714304, -73.827263
11425,40.607754, -74.023937
11426,40.736425, -73.722376
11427,40.730904, -73.745661
11428,40.721016, -73.742245
11429,40.709766, -73.738653
11430,40.646964, -73.784813
11432,40.715359, -73.793071
11433,40.698162, -73.786893
11434,40.676808, -73.776425
11435,40.701265, -73.809605
11436,40.675807, -73.796622
11451,40.701282, -73.795972
11501,40.746286, -73.638905
11507,40.770847, -73.652260
11509,40.587963, -73.728528
11510,40.650127, -73.607709
11514,40.749892, -73.612477
11516,40.625787, -73.726685
11518,40.637472, -73.666807
11520,40.649401, -73.582951
11530,40.726854, -73.637009
11542,40.872605, -73.628622
11545,40.826321, -73.589365
11547,40.833670, -73.642687
11548,40.812868, -73.627405
11549,40.717289, -73.602775
11550,40.701475, -73.621108
11552,40.692979, -73.652416
11553,40.706430, -73.591622
11554,40.720115, -73.558861
11556,40.719678, -73.583860
11557,40.637176, -73.691976
11558,40.605357, -73.649046
11559,40.603733, -73.717352
11560,40.880757, -73.588724
11561,40.589081, -73.648178
11563,40.657253, -73.673718
11565,40.675061, -73.671667
11566,40.663194, -73.554014
11568,40.786929, -73.596490
11569,40.589785, -73.582303
11570,40.666066, -73.638409
11572,40.631772, -73.636624
11575,40.680422, -73.584877
11576,40.798032, -73.647275
11577,40.783264, -73.638877
11579,40.844016, -73.644006
11580,40.674900, -73.702154
11581,40.651028, -73.715325
11590,40.755182, -73.574338
11596,40.759667, -73.642309
11598,40.630935, -73.712339
11691,40.601278, -73.761651
11692,40.594095, -73.792896
11693,40.590692, -73.809749
11694,40.578270, -73.844762
11697,40.555688, -73.920663`

const cleanZipData = data.split("\n").map(str => {
    return str.split(/[, ]/).filter(str => str !== "").map(Number)
})

function Map() {
    const [nearestRestaurants, setNearestRestaurants] = useState([]);
    const [zipCodeEntered, setZipCodeEntered] = useState(10004)
    const [positionCoordinates, setPositionCoordinates] = useState([40.706027, -74.008835])

    useEffect(() => {
        fetch(`http://localhost:9292/restaurants/search?zipcode=${zipCodeEntered}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                setNearestRestaurants(data)
            })
    }, [zipCodeEntered])

    function handleSubmit(e) {
        e.preventDefault();
        const coords = cleanZipData.find(el => el[0] === Number(e.target.searchZipCode.value))
        setZipCodeEntered(e.target.searchZipCode.value)
        setPositionCoordinates(coords.slice(1, 3))
    }

    return (
        <div id="map-page">
            <div id="nearby-restaurant-list" className="map">
                <h3 className="enter-a-zipcode">Where to judgie?</h3>
                <form onSubmit={handleSubmit} className="enter-a-zipcode">
                    <input id="searchZipCode" type="number" step="1" size="5" min="10001" max="11256" placeholder="Enter a Manhattan/Brooklyn ZipCode"></input>
                    <input className="enter-a-zipcode" type="submit"></input>
                </form>
                {nearestRestaurants.map(restaurant => {
                    return (<RestaurantSearchResult
                        key={restaurant.id}
                        restaurant={restaurant}
                    />)
                })}
            </div>

            <div id="map-view" className="map">

                <MapContainer center={positionCoordinates} zoom={15} scrollWheelZoom={true} >
                    <ChangeView center={positionCoordinates} zoom={18} />
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {nearestRestaurants.map(restaurant => {
                        const coordinates = [restaurant.latitude, restaurant.longitude]
                        // imageLink currently only works for 149 of the first restaurants. Need to be resized 
                        // const imageLink = restaurant.images[0] ? restaurant.images[0].replace("500x500", "150x150") : null;
                        return (
                            <Marker key={restaurant.id} position={coordinates}>
                                <Popup>
                                    <h4>{restaurant.name}</h4>
                                    <p>{restaurant.address}, {restaurant.neighborhood}</p>
                                </Popup>
                            </Marker>
                        )
                    })}
                    <Marker position={positionCoordinates}></Marker>
                </MapContainer>
            </div>


        </div>
    )
}

export default Map;