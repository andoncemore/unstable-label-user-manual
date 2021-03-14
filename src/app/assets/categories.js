const category_data = [
    {
        "description": null,
        "id": 1,
        "labels": null,
        "name": "streetcar",
        "relabel": null,
        "session": 1
    },
    {
        "description": null,
        "id": 2,
        "labels": null,
        "name": "patio",
        "relabel": null,
        "session": 1
    },
    {
        "description": null,
        "id": 3,
        "labels": null,
        "name": "crane",
        "relabel": null,
        "session": 1
    },
    {
        "description": null,
        "id": 4,
        "labels": null,
        "name": "church",
        "relabel": null,
        "session": 1
    },
    {
        "description": null,
        "id": 5,
        "labels": null,
        "name": "scoreboard",
        "relabel": null,
        "session": 1
    },
    {
        "description": null,
        "id": 6,
        "labels": null,
        "name": "snowfield",
        "relabel": null,
        "session": 2
    },
    {
        "description": null,
        "id": 7,
        "labels": null,
        "name": "server room",
        "relabel": null,
        "session": 2
    },
    {
        "description": null,
        "id": 8,
        "labels": null,
        "name": "crosswalk",
        "relabel": null,
        "session": 2
    },
    {
        "description": null,
        "id": 9,
        "labels": null,
        "name": "embassy",
        "relabel": null,
        "session": 2
    },
    {
        "description": null,
        "id": 10,
        "labels": null,
        "name": "beach house",
        "relabel": null,
        "session": 2
    },
    {
        "description": null,
        "id": 11,
        "labels": null,
        "name": "parking lot",
        "relabel": null,
        "session": 2
    },
    {
        "description": null,
        "id": 12,
        "labels": null,
        "name": "industrial area",
        "relabel": null,
        "session": 2
    },
    {
        "description": null,
        "id": 13,
        "labels": null,
        "name": "car",
        "relabel": null,
        "session": 3
    },
    {
        "description": null,
        "id": 14,
        "labels": null,
        "name": "person",
        "relabel": null,
        "session": 3
    },
    {
        "description": "I've only seen server rooms in movies",
        "id": 15,
        "labels": "1",
        "name": "movie setting",
        "relabel": 7,
        "session": 4,
        "shape": "M 0.7227138643067846 0.04838709677419355 L 0.29793510324483774 0.002688172043010753 L 0.10619469026548672 0.10215053763440861 L 0.14749262536873156 0.3844086021505376 L 0.0029498525073746312 0.7446236559139785 L 0.008849557522123894 0.8817204301075269 L 0.13569321533923304 0.967741935483871 L 0.3421828908554572 1 L 0.9380530973451328 0.9704301075268817 L 0.976401179941003 0.9381720430107527 L 1 0.8145161290322581 L 0.887905604719764 0.5994623655913979 Z",
        "width": 84.125,
        "height": 79.125
    },
    {
        "description": "Cars are really necessary in pasadena",
        "id": 16,
        "labels": "2",
        "name": "accessibility",
        "relabel": 13,
        "session": 4,
        "shape": "M 0.2962962962962963 0 L 0.12962962962962962 0.039473684210526314 L 0.05555555555555555 0.14473684210526316 L 0.043209876543209874 0.6578947368421053 L 0.2345679012345679 0.8486842105263158 L 0.8024691358024691 0.993421052631579 L 0.9876543209876543 0.6907894736842105 L 0.9876543209876543 0.4605263157894737 L 0.41975308641975306 0.16447368421052633 L 0.32098765432098764 0 Z" ,
        "width": 28.125,
        "height": 26.389 
    },
    {
        "description": "Cars in a quiet and elegant city like Kyoto seem noisy and take a lot of space",
        "id": 17,
        "labels": "3",
        "name": "annoying things",
        "relabel": 1,
        "session": 5,
        "shape": "M 0 0 L 0.0055248618784530384 0.5739644970414202 L 0.08839779005524862 0.9526627218934911 L 0.6077348066298343 1 L 0.8895027624309392 0.9704142011834319 L 0.9668508287292817 0.893491124260355 L 1 0.7514792899408284 L 0.8729281767955801 0.25443786982248523 L 0.7624309392265194 0.09467455621301775 L 0.06077348066298342 0.023668639053254437 Z",
        "width": 31.424,
        "height": 29.34
    },
    {
        "description": "Most people come here for visiting instead of religious intentions",
        "id": 18,
        "labels": "4",
        "name": "visitors",
        "relabel": 14,
        "session": 6,
        "shape": "M 0.6166666666666667 0.028846153846153848 L 0.23333333333333334 0.019230769230769232 L 0 0.18269230769230768 L 0.21666666666666667 0.8173076923076923 L 0.5666666666666667 1 L 0.9166666666666666 0.8076923076923077 L 0.9666666666666667 0.057692307692307696 Z",
        "width": 24,
        "height": 19.75
    },
    {
        "description": "The number on Taxi meter changes as quickLy as Your heart beat",
        "id": 19,
        "labels": "5",
        "name": "crazy expensive transportation",
        "relabel": 9,
        "session": 6,
        "shape": "M 0.016216216216216217 0.6837606837606838 L 0.016216216216216217 0.8974358974358975 L 0.10270270270270271 0.9829059829059829 L 0.21081081081081082 1 L 0.372972972972973 0.7435897435897436 L 0.5459459459459459 0.6923076923076923 L 0.7189189189189189 0.7008547008547008 L 0.8054054054054054 0.8888888888888888 L 0.9297297297297298 0.905982905982906 L 1 0.5128205128205128 L 0.5567567567567567 0.02564102564102564 L 0.2594594594594595 0 L 0.10810810810810811 0.06837606837606838 L 0 0.5897435897435898 Z",
        "width": 32.118,
        "height": 20.3125
    },
    {
        "description": "Keep visitors from crossing the street",
        "id": 20,
        "labels": "6",
        "name": "fence",
        "relabel": 8,
        "session": 6,
        "shape": "M 0.06696428571428571 0 L 0.8928571428571429 0.028169014084507043 L 0.9866071428571429 0.16901408450704225 L 0.9955357142857143 0.4647887323943662 L 0.8928571428571429 1 L 0.6964285714285714 0.9014084507042254 L 0.5848214285714286 0.49295774647887325 L 0.42410714285714285 0.38028169014084506 L 0.13839285714285715 0.7887323943661971 L 0.013392857142857142 0.6619718309859155 L 0.004464285714285714 0.1267605633802817 Z",
        "width": 38.888,
        "height": 12.326
    },
    {
        "description": "you don’t really need a car to get around, so it’s really a bit of a luxury",
        "id": 21,
        "labels": "7",
        "name": "luxury",
        "relabel": 13,
        "session": 13,
        "shape": "M 0.9711538461538461 0 L 0.019230769230769232 0.5208333333333334 L 0.009615384615384616 0.7708333333333334 L 0.2403846153846154 0.9652777777777778 L 0.4326923076923077 0.9861111111111112 L 0.7788461538461539 0.8333333333333334 L 0.9423076923076923 0.5 L 0.8461538461538461 0.2361111111111111 L 0.9903846153846154 0.020833333333333332 Z",
        "width": 18.055,
        "height": 25
    },
    {
        "description": "Uber tests self driving cars in Pittsburgh in order to better create their infrastructure",
        "id": 22,
        "labels": "11",
        "name": "uber",
        "relabel": 13,
        "session": 7,
        "shape": "M 0.6402439024390244 0.25892857142857145 L 0.042682926829268296 0.3125 L 0.024390243902439025 0.6607142857142857 L 0.23170731707317074 0.9821428571428571 L 0.34146341463414637 0.9910714285714286 L 0.4634146341463415 0.9375 L 0.524390243902439 0.5535714285714286 L 0.7134146341463414 0.7678571428571429 L 0.7987804878048781 0.6607142857142857 L 0.9573170731707317 0.6875 L 0.9878048780487805 0.5267857142857143 L 0.8780487804878049 0.11607142857142858 L 0.7378048780487805 0 L 0.5853658536585366 0.05357142857142857 L 0.6707317073170732 0.20535714285714285 Z",
        "width": 6.125,
        "height": 7.5
    },
    {
        "description": "Pittsburgh has shitty roads and signage",
        "id": 23,
        "labels": "12,13",
        "name": "roads",
        "relabel": 13,
        "session": 7,
        "shape": "M 0.9736842105263158 0.06338028169014084 L 0.5263157894736842 0.007042253521126761 L 0.039473684210526314 0.16901408450704225 L 0 0.3591549295774648 L 0.15789473684210525 0.8450704225352113 L 0.4605263157894737 0.9859154929577465 L 0.7960526315789473 0.9507042253521126 L 0.9802631578947368 0.7676056338028169 L 0.9342105263157895 0.31690140845070425 L 0.993421052631579 0.2112676056338028 Z",
        "width": 21.25,
        "height": 6.25
    },
    {
        "description": "Shady side is a rich and safe neighborhood. A lot of university students come here to eat food and shop. It is a tight nit community.",
        "id": 24,
        "labels": "8,9",
        "name": "wealthy",
        "relabel": 14,
        "session": 7,
        "shape": "M 0.24202127659574468 0 L 0.8085106382978723 0 L 0.8882978723404256 0.6748466257668712 L 0.9920212765957447 0.852760736196319 L 0.9867021276595744 0.9631901840490797 L 0.8696808510638298 0.9938650306748467 L 0.7420212765957447 0.9141104294478528 L 0.7127659574468085 0.754601226993865 L 0.6356382978723404 0.6809815950920245 L 0.44148936170212766 0.7423312883435583 L 0.3404255319148936 0.8773006134969326 L 0.23404255319148937 0.852760736196319 L 0.14893617021276595 0.5153374233128835 L 0.013297872340425532 0.3312883435582822 L 0.0026595744680851063 0.22085889570552147 L 0.0425531914893617 0.12269938650306748 Z",
        "width": 8.375,
        "height": 19.875
    },
    {
        "description": "Buses come frequently and get to most places in Pittsburgh. It makes it easier to not own a car.",
        "id": 25,
        "labels": "10",
        "name": "convenient transportation",
        "relabel": 13,
        "session": 7,
        "shape": "M 0.5909090909090909 0.058823529411764705 L 0.25 0.023529411764705882 L 0.03977272727272727 0.24705882352941178 L 0.005681818181818182 0.4235294117647059 L 0.20454545454545456 0.6823529411764706 L 0.42613636363636365 0.6470588235294118 L 0.4602272727272727 0.8705882352941177 L 0.7159090909090909 1 L 0.9545454545454546 0.8 L 0.9886363636363636 0.5764705882352941 Z",
        "width": 21.25,
        "height": 6.25
    },
    {
        "description": "Beach houses used to just be a house. But now its become a vacation home for rich white people. Because of this, they are taking away housing for the locals in Hawaii. This also speaks to the gentrification that is happening in Hawaii. The new developments cost millions of dollars to buy where the average annual salary of a person working in Hawaii is around $30,000. How are you supposed to buy a condo?!?!?! The people who end up buying the nice condos are either foreign investors or rich people who are retired. The new graduates can’t even afford to rent a place and end up living with their parents.",
        "id": 26,
        "labels": "14",
        "name": "rich white people",
        "relabel": 10,
        "session": 8,
        "shape": "M 0 0.010869565217391304 L 0.711864406779661 0 L 0.9745762711864406 0.9782608695652174 L 0.11864406779661017 0.9347826086956522 L 0.025423728813559324 0.5108695652173914 L 0.07627118644067797 0.11956521739130435 Z",
        "width": 12.125,
        "height": 19.75
    },
    {
        "description": "Uber for the beach is actually a pretty great idea BECAUSE that means that you don’t get your OWN car sandy. If you drive to the beach, you’ll always get sand in the car",
        "id": 27,
        "labels": "15",
        "name": "sandy cars",
        "relabel": 22,
        "session": 8,
        "shape": "M 0.890625 0 L 0.046875 0.061224489795918366 L 0.0625 0.9897959183673469 L 0.5625 0.9591836734693877 L 0.546875 0.25510204081632654 L 1 0.05612244897959184 Z",
        "width": 21.25,
        "height": 6.25
    },
    {
        "description": "The places that have an ocean view or ocean front is considered a prime location. However because this is an island, access to water is very convenient,. It takes less than 15 minutes to get to a beach. It’s interesting to see the dynamic between rich people who live in ocean front houses and the middle class who go to the beach.",
        "id": 28,
        "labels": "16,17",
        "name": "place to retire in",
        "relabel": 24,
        "session": 8,
        "shape": "M 0.9523809523809523 0.45918367346938777 L 0.9783549783549783 0.9489795918367347 L 0.7056277056277056 1 L 0.30303030303030304 0.9081632653061225 L 0.04329004329004329 0.7040816326530612 L 0.017316017316017316 0.11224489795918367 L 0.20346320346320346 0.00510204081632653 L 0.5670995670995671 0.02040816326530612 L 0.8571428571428571 0.15306122448979592 L 0.9913419913419913 0.34183673469387754 Z",
        "width": 30.75,
        "height": 24.125
    },
    {
        "description": "Rich teenagers hangout in this parking lot. This community is rich basically.",
        "id": 29,
        "labels": "18",
        "name": "teen hangout spot",
        "relabel": 11,
        "session": 9,
        "shape": "M 0.7479338842975206 0.047619047619047616 L 0.371900826446281 0 L 0.10743801652892562 0.19047619047619047 L 0 0.4642857142857143 L 0.3140495867768595 0.8809523809523809 L 0.9710743801652892 0.9285714285714286 L 0.9710743801652892 0.5595238095238095 L 0.756198347107438 0.07142857142857142 Z",
        "width": 25.5,
        "height": 19.875
    },
    {
        "description": "This is a very busy intersection, with people coming and leaving this shopping mall. Every evening it would take every car at least half an hour to just pass this traffic light. When it’s snow, it is definitely a nightmare for drivers because pedestrian Are almost crazy and fill in every seam between cars, trying to pass here.",
        "id": 30,
        "labels": "19",
        "name": "crazy traffic",
        "relabel": 6,
        "session": 10,
        "shape": "M 0.6993865030674846 0.00980392156862745 L 0.9141104294478528 0.3431372549019608 L 0.9938650306748467 0.8333333333333334 L 0.6196319018404908 1 L 0.17177914110429449 0.9019607843137255 L 0.006134969325153374 0.2647058823529412 L 0.22085889570552147 0.058823529411764705 L 0.6257668711656442 0 Z",
        "width": 33.625,
        "height": 13.75
    },
    {
        "description": "the red line has gotten worse lately,  from completely delayed trains and completely full stations. And people who work here (ie Google, Microsoft, Facebook, Amazon, MIT)are rich as fuck and can just afford to Uber",
        "id": 31,
        "labels": "22",
        "name": "people not using public transit",
        "relabel": 22,
        "session": 11,
        "shape": "M 0.11913357400722022 0 L 0.9061371841155235 0.04838709677419355 L 0.9675090252707581 0.1774193548387097 L 0.9891696750902527 0.717741935483871 L 0.8194945848375451 0.967741935483871 L 0.45126353790613716 1 L 0.04332129963898917 0.8790322580645161 L 0 0.6451612903225806 Z",
        "width": 48.09,
        "height": 21.52
    },
    {
        "description": "So many people who work  + live around Kendall Square don't seem to cook?????There are no places for the public to eat or spend time in after regular work hours. Until very recently,   there was no grocery store nearby. Now there is a boutique one cool cool cool.",
        "id": 32,
        "labels": "20",
        "name": "food desert",
        "relabel": 24,
        "session": 11,
        "shape": "M 0.11913357400722022 0 L 0.9061371841155235 0.04838709677419355 L 0.9675090252707581 0.1774193548387097 L 0.9891696750902527 0.717741935483871 L 0.8194945848375451 0.967741935483871 L 0.45126353790613716 1 L 0.04332129963898917 0.8790322580645161 L 0 0.6451612903225806 Z",
        "width": 21.25,
        "height": 6.25
    },
    {
        "description": "above ground, makes driving a nightmare so ppl don't use them",
        "id": 33,
        "labels": "21",
        "name": "those trolleys that are really cute and old timey",
        "relabel": 1,
        "session": 11,
        "shape": "M 0 0.23140495867768596 L 0.027777777777777776 0.9380165289256198 L 0.5055555555555555 1 L 0.7388888888888889 0.9958677685950413 L 0.8833333333333333 0.9380165289256198 L 0.9944444444444445 0.7355371900826446 L 0.9111111111111111 0.6157024793388429 L 0.6055555555555555 0.47520661157024796 L 0.4722222222222222 0.09090909090909091 L 0.2833333333333333 0 L 0.12222222222222222 0.024793388429752067 L 0.05 0.11983471074380166 Z",
        "width": 16.75,
        "height": 8.5
    },
    {
        "description": "This path is too narrow for two people walking side by side. And the surface is full of traps to make the beginners fall!!!!",
        "id": 34,
        "labels": "23",
        "name": "toooooooo difficult for skateboarding beginner",
        "relabel": 12,
        "session": 12,
        "shape": "M 0.031055900621118012 0 L 0 0.9330855018587361 L 0.13664596273291926 1 L 0.8695652173913043 0.8773234200743495 L 0.9565217391304348 0.8066914498141264 L 1 0.4052044609665427 L 0.8012422360248447 0.275092936802974 L 0.45962732919254656 0.1895910780669145 Z",
        "width": 43,
        "height": 23.25
    }
]

export default category_data;