export const SelectTravelsList=[
    {
        id:1,
        title:'Just Me',
        desc:'A sole traveles in exploration',
        icon:'✈️',
        people:'1'
    },
    {
        id:2,
        title:'Couple',
        desc:'A romantic getaway for two',
        icon:'💑',
        people:'2'
    },
    {
        id:3,
        title:'Family',
        desc:'A fun-filled trip for the whole family',
        icon:'👨‍👩‍👧‍👦',  
        people:'3-5'
    },
    {
        id:4,
        title:'Friends',
        desc:'A social trip for a group of friends',
        icon:'👥',
        people:'4-6'
    }
]

export const SelectBudgetOptions=[
    {
        id:1,
        title:'Cheap',
        desc:'Affordable travel options',
        icon:'💰'
    },
    {
        id:2,
        title:'Mid-range',
        desc:'Balanced travel experience',
        icon:'💵'
    },
    {
        id:3,
        title:'Luxury',
        desc:'Premium travel experience',
        icon:'💎'
    },
]

export const AI_PROMT=
'Generate Travel Plan for Location: {location}, Duration: {duration} days, Budget: {budget}, Travel Type: {travelType}. Include daily activities, recommended places to visit, and dining options. Format the response in JSON with keys: "day1", "day2", etc., each containing an array of activities with "time", "activity", and "description".'