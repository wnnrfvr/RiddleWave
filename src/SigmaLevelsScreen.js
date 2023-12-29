import React, { useState, useEffect } from "react";
import { Text, View, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons"; // Import FontAwesome from Expo vector-icons

const emojiRiddles = [
  {
    emojicomb: "🤔🔍🌎",
    answer: "Think Outside The Box",
    hints: "Common phrase",
    contains: ["think", "outside", "box"],
  },
  {
    emojicomb: "🔥🔗🌐",
    answer: "Firewall",
    hints: "Computer security term",
    contains: ["fire", "wall"],
  },
  {
    emojicomb: "📅📆🎉",
    answer: "Save The Date",
    hints: "Event invitation phrase",
    contains: ["save", "date"],
  },
  {
    emojicomb: "🌈🐦📚",
    answer: "Read Between The Lines",
    hints: "Interpretation advice",
    contains: ["read", "between", "lines"],
  },
  {
    emojicomb: "⚖️🐜📜",
    answer: "Antitrust",
    hints: "Legal term",
    contains: ["antitrust"],
  },
  {
    emojicomb: "🚗🔒🚪",
    answer: "Locked Car Door",
    hints: "Vehicle security feature",
    contains: ["locked", "car", "door"],
  },
  {
    emojicomb: "🌊🌍🧊",
    answer: "Global Warming",
    hints: "Environmental issue",
    contains: ["global", "warming"],
  },
  {
    emojicomb: "🧠💡🚪",
    answer: "Open-minded",
    hints: "Characteristic",
    contains: ["open-minded"],
  },
  {
    emojicomb: "📚🤖🔍",
    answer: "Artificial Intelligence",
    hints: "Advanced technology",
    contains: ["artificial", "intelligence"],
  },
  {
    emojicomb: "🍏🌊🚣",
    answer: "Apple of my Eye",
    hints: "Expression of affection",
    contains: ["apple", "eye"],
  },
  {
    emojicomb: "🕰️🚶‍♂️🚶‍♀️",
    answer: "Time Flies When You're Having Fun",
    hints: "Expression about enjoyable moments",
    contains: ["time", "flies", "fun"],
  },
  {
    emojicomb: "🧩🔍📜",
    answer: "Puzzle Piece Together",
    hints: "Activity involving problem-solving",
    contains: ["puzzle", "piece", "together"],
  },
  {
    emojicomb: "⚡👦👓",
    answer: "Harry Potter",
    hints: "Famous fictional character",
    contains: ["harry", "potter"],
  },
  {
    emojicomb: "📱🌐👥",
    answer: "Social Media",
    hints: "Online communication platform",
    contains: ["social", "media"],
  },
  {
    emojicomb: "🚀📈🌌",
    answer: "Skyrocketing Success",
    hints: "Achieving rapid growth",
    contains: ["skyrocketing", "success"],
  },
  {
    emojicomb: "🤖💬🌐",
    answer: "Chatbot",
    hints: "Automated messaging program",
    contains: ["chatbot"],
  },
  {
    emojicomb: "🎭🐦🗣️",
    answer: "Twitter Drama",
    hints: "Online social platform activity",
    contains: ["twitter", "drama"],
  },
  {
    emojicomb: "🌍👥💬",
    answer: "Global Conversation",
    hints: "Worldwide discussion",
    contains: ["global", "conversation"],
  },
  {
    emojicomb: "🌞🏠🚪",
    answer: "Sunshine State",
    hints: "Nickname for a sunny location",
    contains: ["sunshine", "state"],
  },
  {
    emojicomb: "🌲🎄🎁",
    answer: "Christmas Tree",
    hints: "Festive decoration",
    contains: ["christmas", "tree"],
  },
  {
    emojicomb: "🎤🚪🚶",
    answer: "Walk of Fame",
    hints: "Celebrity recognition area",
    contains: ["walk", "fame"],
  },
  {
    emojicomb: "🔮🕵️‍♂️👁️",
    answer: "Crystal Clear Vision",
    hints: "Perfect clarity",
    contains: ["crystal", "clear", "vision"],
  },
  {
    emojicomb: "🧊🌬️🎶",
    answer: "Cool Wind Symphony",
    hints: "Refreshing musical experience",
    contains: ["cool", "wind", "symphony"],
  },
  {
    emojicomb: "🏰👸🤴",
    answer: "Fairytale Castle",
    hints: "Magical kingdom",
    contains: ["fairytale", "castle"],
  },
  {
    emojicomb: "🔒📖🗝️",
    answer: "Locked Book Secret",
    hints: "Confidential information",
    contains: ["locked", "book", "secret"],
  },
  {
    emojicomb: "🐰🕳️⏰",
    answer: "Rabbit Hole Time Travel",
    hints: "Alice in Wonderland adventure",
    contains: ["rabbit", "hole", "time", "travel"],
  },
  {
    emojicomb: "📸📱👥",
    answer: "Instagram Selfie",
    hints: "Social media photo-sharing",
    contains: ["instagram", "selfie"],
  },
  {
    emojicomb: "🚗🏞️🏕️",
    answer: "Road Trip Camping",
    hints: "Outdoor adventure",
    contains: ["road", "trip", "camping"],
  },
  {
    emojicomb: "🎨🖌️🖼️",
    answer: "Art Brush Canvas",
    hints: "Creative expression",
    contains: ["art", "brush", "canvas"],
  },
  {
    emojicomb: "🌈☔🔍",
    answer: "Rainbow Search",
    hints: "Seeking colorful moments",
    contains: ["rainbow", "search"],
  },
  {
    emojicomb: "📬🕵️‍♂️💌",
    answer: "Mail Detective Love Letter",
    hints: "Romantic investigation",
    contains: ["mail", "detective", "love", "letter"],
  },
  {
    emojicomb: "🍕🍔🍟",
    answer: "Fast Food Feast",
    hints: "Quick and convenient meals",
    contains: ["fast", "food", "feast"],
  },
  {
    emojicomb: "🎭🤹‍♂️🎪",
    answer: "Circus Performer",
    hints: "Entertainment under the big top",
    contains: ["circus", "performer"],
  },
  {
    emojicomb: "📈📊📉",
    answer: "Financial Rollercoaster",
    hints: "Economic ups and downs",
    contains: ["financial", "rollercoaster"],
  },
  {
    emojicomb: "🍎📚📝",
    answer: "Apple for the Teacher",
    hints: "Teacher appreciation",
    contains: ["apple", "teacher"],
  },
  {
    emojicomb: "🚀🌌🪐",
    answer: "Space Exploration",
    hints: "Journey beyond Earth",
    contains: ["space", "exploration"],
  },
  {
    emojicomb: "🎭🎬🌟",
    answer: "Hollywood Star",
    hints: "Celebrity on the walk of fame",
    contains: ["hollywood", "star"],
  },
  {
    emojicomb: "🎉🎈🎂",
    answer: "Birthday Celebration",
    hints: "Special occasion party",
    contains: ["birthday", "celebration"],
  },
  {
    emojicomb: "📚🚪🔮",
    answer: "Book Portal Magic",
    hints: "Literary enchantment",
    contains: ["book", "portal", "magic"],
  },
  {
    emojicomb: "🕰️🍵🍃",
    answer: "Tea Time Travel",
    hints: "Relaxing historical journey",
    contains: ["tea", "time", "travel"],
  },
  {
    emojicomb: "🏰🐉👑",
    answer: "Dragon Castle Kingdom",
    hints: "Medieval fantasy realm",
    contains: ["dragon", "castle", "kingdom"],
  },
  {
    emojicomb: "🚁🗺️🏞️",
    answer: "Helicopter Sightseeing",
    hints: "Aerial exploration",
    contains: ["helicopter", "sightseeing"],
  },
  {
    emojicomb: "🎵🎹🎶",
    answer: "Piano Music Harmony",
    hints: "Melodic instrument play",
    contains: ["piano", "music", "harmony"],
  },
  {
    emojicomb: "🌌👽🚀",
    answer: "Alien Space Travel",
    hints: "Extraterrestrial adventure",
    contains: ["alien", "space", "travel"],
  },
  {
    emojicomb: "🏝️🌊🍹",
    answer: "Island Vacation Relaxation",
    hints: "Tropical leisure time",
    contains: ["island", "vacation", "relaxation"],
  },
  {
    emojicomb: "🎭🃏🎲",
    answer: "Joker Card Game",
    hints: "Playful trick-taking",
    contains: ["joker", "card", "game"],
  },
  {
    emojicomb: "🏰🗝️🚪",
    answer: "Castle Key Entrance",
    hints: "Mysterious gateway",
    contains: ["castle", "key", "entrance"],
  },
  {
    emojicomb: "🍫🌰🍦",
    answer: "Chocolate Nut Ice Cream",
    hints: "Sweet frozen treat",
    contains: ["chocolate", "nut", "ice cream"],
  },
  {
    emojicomb: "🏡🏞️🌷",
    answer: "Home Garden Blooms",
    hints: "Domestic floral paradise",
    contains: ["home", "garden", "blooms"],
  },
  {
    emojicomb: "🚢⚓🏴‍☠️",
    answer: "Pirate Ship Adventure",
    hints: "High seas escapade",
    contains: ["pirate", "ship", "adventure"],
  },
  {
    emojicomb: "📷🌅🌄",
    answer: "Sunset Photography",
    hints: "Capturing evening skies",
    contains: ["sunset", "photography"],
  },
  {
    emojicomb: "🚗🛣️🗺️",
    answer: "Road Trip Map",
    hints: "Travel planning tool",
    contains: ["road", "trip", "map"],
  },
  {
    emojicomb: "🎮👾🕹️",
    answer: "Video Game Console",
    hints: "Electronic entertainment",
    contains: ["video game", "console"],
  },{
    emojicomb: "🔍🗺️🏞️",
    answer: "Explore the World",
    hints: "Adventurous activity",
    contains: ["explore", "world"],
  },
  {
    emojicomb: "🏰👻🔦",
    answer: "Haunted Castle Tour",
    hints: "Spooky historical visit",
    contains: ["haunted", "castle", "tour"],
  },
  {
    emojicomb: "🌋🚶‍♂️🚶‍♀️",
    answer: "Volcano Hiking Expedition",
    hints: "Geological trek",
    contains: ["volcano", "hiking", "expedition"],
  },
  {
    emojicomb: "🚂🏞️🚋",
    answer: "Train Journey Adventure",
    hints: "Railway exploration",
    contains: ["train", "journey", "adventure"],
  },
  {
    emojicomb: "🏰👑👸",
    answer: "Royal Coronation Ceremony",
    hints: "Majestic event",
    contains: ["royal", "coronation", "ceremony"],
  },
  {
    emojicomb: "🌊🌴🍹",
    answer: "Beach Vacation Bliss",
    hints: "Seaside relaxation",
    contains: ["beach", "vacation", "bliss"],
  },
  {
    emojicomb: "🕵️‍♀️🔍🗞️",
    answer: "Detective Newspaper Investigation",
    hints: "Solving mysteries",
    contains: ["detective", "newspaper", "investigation"],
  },
  {
    emojicomb: "🚲🍃🌲",
    answer: "Bike Ride in the Forest",
    hints: "Cycling through nature",
    contains: ["bike", "ride", "forest"],
  },
  {
    emojicomb: "🎬🍿🏆",
    answer: "Movie Popcorn Awards",
    hints: "Cinematic recognition",
    contains: ["movie", "popcorn", "awards"],
  },
  {
    emojicomb: "🚁🌄📸",
    answer: "Helicopter Sunset Photography",
    hints: "Aerial photography at dusk",
    contains: ["helicopter", "sunset", "photography"],
  },
  {
    emojicomb: "🎭🎟️🎪",
    answer: "Carnival Ticket Admission",
    hints: "Entrance to festive fun",
    contains: ["carnival", "ticket", "admission"],
  },
  {
    emojicomb: "🚀🌌🤖",
    answer: "Space Robot Exploration",
    hints: "Android on cosmic quest",
    contains: ["space", "robot", "exploration"],
  },
  {
    emojicomb: "🌈🦄🏰",
    answer: "Unicorn Fantasy Castle",
    hints: "Mythical creature dwelling",
    contains: ["unicorn", "fantasy", "castle"],
  },
  {
    emojicomb: "🍔🍟🤖",
    answer: "Fast Food Robot Chef",
    hints: "Automated culinary creation",
    contains: ["fast", "food", "robot", "chef"],
  },
  {
    emojicomb: "🏞️🚣‍♂️🌄",
    answer: "River Rafting Sunrise",
    hints: "Adventurous water activity",
    contains: ["river", "rafting", "sunrise"],
  },{
    emojicomb: "🎭🎨🖌️",
    answer: "Art Festival Painting",
    hints: "Creative public event",
    contains: ["art", "festival", "painting"],
  },
  {
    emojicomb: "🎭🚪🚶‍♂️",
    answer: "Theater Exit Stage Left",
    hints: "Classic dramatic phrase",
    contains: ["theater", "exit", "stage", "left"],
  },
  {
    emojicomb: "🍕🍝🍨",
    answer: "Italian Cuisine Feast",
    hints: "Delicious Mediterranean food",
    contains: ["italian", "cuisine", "feast"],
  },
  {
    emojicomb: "🔮🧙‍♂️📘",
    answer: "Wizard Spellbook Magic",
    hints: "Fantasy incantations",
    contains: ["wizard", "spellbook", "magic"],
  },
  {
    emojicomb: "🚗🏰👻",
    answer: "Haunted Road Trip",
    hints: "Spooky travel adventure",
    contains: ["haunted", "road", "trip"],
  },
  {
    emojicomb: "🌍📸🔍",
    answer: "World Photography Day",
    hints: "Global celebration of images",
    contains: ["world", "photography", "day"],
  },
  {
    emojicomb: "🌄🌅📷",
    answer: "Sunrise Sunset Capture",
    hints: "Documenting the day's extremes",
    contains: ["sunrise", "sunset", "capture"],
  },
  {
    emojicomb: "🏰🔒🗝️",
    answer: "Locked Castle Mystery",
    hints: "Enigmatic fortress",
    contains: ["locked", "castle", "mystery"],
  },
  {
    emojicomb: "🐱🐶🏡",
    answer: "Pets at Home",
    hints: "Furry companions indoors",
    contains: ["pets", "at", "home"],
  },
  {
    emojicomb: "🚴‍♂️🌲🌳",
    answer: "Mountain Biking Trail",
    hints: "Off-road cycling adventure",
    contains: ["mountain", "biking", "trail"],
  },
  {
    emojicomb: "🌌🚀👩‍🚀",
    answer: "Space Travel Astronaut",
    hints: "Journey beyond Earth's atmosphere",
    contains: ["space", "travel", "astronaut"],
  },
  {
    emojicomb: "🕵️‍♂️🧩🗝️",
    answer: "Escape Room Challenge",
    hints: "Puzzle-solving adventure",
    contains: ["escape", "room", "challenge"],
  },
  {
    emojicomb: "🧊🍧🍦",
    answer: "Ice Cream Chill",
    hints: "Cooling dessert delight",
    contains: ["ice", "cream", "chill"],
  },
  {
    emojicomb: "🌍🌊🏝️",
    answer: "Island Hopping Vacation",
    hints: "Exploring multiple tropical destinations",
    contains: ["island", "hopping", "vacation"],
  },
  {
    emojicomb: "🚤🌊🌅",
    answer: "Boat Sunset Cruise",
    hints: "Nautical evening journey",
    contains: ["boat", "sunset", "cruise"],
  },
  {
    emojicomb: "👨‍🍳🍲🔪",
    answer: "Chef Cooking Show",
    hints: "Culinary television program",
    contains: ["chef", "cooking", "show"],
  },
  {
    emojicomb: "📚🎓🧑‍🏫",
    answer: "Education Graduation Success",
    hints: "Accomplishment in learning",
    contains: ["education", "graduation", "success"],
  },
  {
    emojicomb: "🌟💫✨",
    answer: "Starry Night Sky",
    hints: "Nocturnal celestial display",
    contains: ["starry", "night", "sky"],
  },
  {
    emojicomb: "🚗🌲🏞️",
    answer: "Road Trip Nature Exploration",
    hints: "Traveling through scenic landscapes",
    contains: ["road", "trip", "nature", "exploration"],
  },
  {
    emojicomb: "🛍️🎁🎉",
    answer: "Shopping Spree Celebration",
    hints: "Festive retail therapy",
    contains: ["shopping", "spree", "celebration"],
  },{
    emojicomb: "🎬🤖🚗",
    answer: "Transformers Movie",
    hints: "Robots in disguise on the big screen",
    contains: ["transformers", "movie"],
  },
  {
    emojicomb: "🌲🏞️🌄",
    answer: "Mountain Sunrise Hike",
    hints: "Early morning outdoor adventure",
    contains: ["mountain", "sunrise", "hike"],
  },
  {
    emojicomb: "🚢🏝️👙",
    answer: "Cruise Beach Vacation",
    hints: "Seafaring holiday by the shore",
    contains: ["cruise", "beach", "vacation"],
  },
  {
    emojicomb: "🧙‍♂️📚🏰",
    answer: "Wizard Book Castle",
    hints: "Magical literature in a fortress",
    contains: ["wizard", "book", "castle"],
  },
  {
    emojicomb: "🍣🍱🥢",
    answer: "Sushi Japanese Cuisine",
    hints: "Traditional Asian food",
    contains: ["sushi", "japanese", "cuisine"],
  },
  {
    emojicomb: "🌈🧁🦄",
    answer: "Rainbow Cupcake Unicorn",
    hints: "Colorful sweet mythical treat",
    contains: ["rainbow", "cupcake", "unicorn"],
  },
  {
    emojicomb: "🎭🎤🎶",
    answer: "Karaoke Night Performance",
    hints: "Singing in the spotlight",
    contains: ["karaoke", "night", "performance"],
  },
  {
    emojicomb: "🚗🌅🏞️",
    answer: "Road Trip Sunrise Adventure",
    hints: "Early morning journey through landscapes",
    contains: ["road", "trip", "sunrise", "adventure"],
  },
  {
    emojicomb: "🌌🛰️🔍",
    answer: "Space Satellite Discovery",
    hints: "Uncovering celestial secrets",
    contains: ["space", "satellite", "discovery"],
  },
  {
    emojicomb: "🎉🎈👶",
    answer: "Birthday Party Baby Shower",
    hints: "Celebrating a new arrival",
    contains: ["birthday", "party", "baby", "shower"],
  },
  {
    emojicomb: "📚📖🌌",
    answer: "Book Universe Exploration",
    hints: "Reading adventures beyond the stars",
    contains: ["book", "universe", "exploration"],
  },
  {
    emojicomb: "🌍🌊🐋",
    answer: "Ocean Conservation Effort",
    hints: "Preserving marine life",
    contains: ["ocean", "conservation", "effort"],
  },
  {
    emojicomb: "🚴‍♀️🌲🏞️",
    answer: "Cycling in the Forest",
    hints: "Biking through wooded trails",
    contains: ["cycling", "forest"],
  },
  {
    emojicomb: "🌆🚇🚄",
    answer: "City Subway Commute",
    hints: "Urban transportation underground",
    contains: ["city", "subway", "commute"],
  },
  {
    emojicomb: "📚🍵👓",
    answer: "Tea and Reading Glasses",
    hints: "Relaxing literary break",
    contains: ["tea", "reading", "glasses"],
  },
  {
    emojicomb: "🎶🏰👸",
    answer: "Musical Princess Castle",
    hints: "Melodic royalty in a fortress",
    contains: ["musical", "princess", "castle"],
  },
  {
    emojicomb: "🚴‍♂️🌅🍃",
    answer: "Morning Bike Ride",
    hints: "Early sunrise cycling adventure",
    contains: ["morning", "bike", "ride"],
  },
  {
    emojicomb: "🌄🏞️🎨",
    answer: "Landscape Painting Workshop",
    hints: "Artistic creation in nature",
    contains: ["landscape", "painting", "workshop"],
  },
  {
    emojicomb: "🚀🌌👾",
    answer: "Space Invaders Game",
    hints: "Retro extraterrestrial arcade fun",
    contains: ["space", "invaders", "game"],
  },
  {
    emojicomb: "📸🏰🌄",
    answer: "Castle Sunset Photography",
    hints: "Capturing the twilight charm",
    contains: ["castle", "sunset", "photography"],
  },{
    emojicomb: "🍩☕🗞️",
    answer: "Coffee and Donuts Breakfast",
    hints: "Morning treat with a hot beverage",
    contains: ["coffee", "donuts", "breakfast"],
  },
  {
    emojicomb: "🌇🏞️🏰",
    answer: "City Park Sunset Castle",
    hints: "Urban greenery with a fortress backdrop",
    contains: ["city", "park", "sunset", "castle"],
  },
  {
    emojicomb: "🎢🎡🎠",
    answer: "Amusement Park Fun",
    hints: "Thrilling rides and attractions",
    contains: ["amusement", "park", "fun"],
  },
  {
    emojicomb: "🌍🏞️👣",
    answer: "World Nature Walk",
    hints: "Strolling through diverse landscapes",
    contains: ["world", "nature", "walk"],
  },
  {
    emojicomb: "🎹🎼🎤",
    answer: "Music Concert Performance",
    hints: "Live show with instrumental and vocal elements",
    contains: ["music", "concert", "performance"],
  },
  {
    emojicomb: "📚📖🔎",
    answer: "Book Detective Mystery",
    hints: "Solving literary puzzles",
    contains: ["book", "detective", "mystery"],
  },
  {
    emojicomb: "🌄🚶‍♀️🌲",
    answer: "Sunrise Nature Walk",
    hints: "Morning stroll in the great outdoors",
    contains: ["sunrise", "nature", "walk"],
  },
  {
    emojicomb: "🎮👫🌌",
    answer: "Video Game Night with Friends",
    hints: "Gaming session with buddies",
    contains: ["video", "game", "night", "friends"],
  },
  {
    emojicomb: "🚗🌊🌴",
    answer: "Beach Road Trip",
    hints: "Coastal adventure by car",
    contains: ["beach", "road", "trip"],
  },
  {
    emojicomb: "📚✏️🎓",
    answer: "School Graduation Ceremony",
    hints: "Completion of educational journey",
    contains: ["school", "graduation", "ceremony"],
  },
  {
    emojicomb: "🍕👨‍🍳🔥",
    answer: "Pizza Chef Oven",
    hints: "Creating delicious pies with a professional touch",
    contains: ["pizza", "chef", "oven"],
  },
  {
    emojicomb: "🏰👻🚪",
    answer: "Haunted House Entry",
    hints: "Braving spooky encounters",
    contains: ["haunted", "house", "entry"],
  },
  {
    emojicomb: "🌆🌇🌃",
    answer: "City Skyline Nightlife",
    hints: "Urban scenery after dark",
    contains: ["city", "skyline", "nightlife"],
  },
  {
    emojicomb: "🚗🌄🏞️",
    answer: "Road Trip Sunrise Landscape",
    hints: "Early morning journey through scenic views",
    contains: ["road", "trip", "sunrise", "landscape"],
  },
  {
    emojicomb: "🎬🍿🏆",
    answer: "Movie Popcorn Awards Night",
    hints: "Celebrating cinematic achievements",
    contains: ["movie", "popcorn", "awards", "night"],
  },
  {
    emojicomb: "🏰🌲🍄",
    answer: "Enchanted Forest Castle",
    hints: "Mystical abode surrounded by nature",
    contains: ["enchanted", "forest", "castle"],
  },
  {
    emojicomb: "🚗🏰🛣️",
    answer: "Castle Road Trip",
    hints: "Journey to a majestic fortress",
    contains: ["castle", "road", "trip"],
  },
  {
    emojicomb: "🍣🍜🥢",
    answer: "Japanese Cuisine Dinner",
    hints: "Delightful Asian culinary experience",
    contains: ["japanese", "cuisine", "dinner"],
  },
  {
    emojicomb: "🌆🚶‍♂️🌇",
    answer: "City Stroll at Sunset",
    hints: "Walking through urban landscapes in the evening",
    contains: ["city", "stroll", "sunset"],
  },
  {
    emojicomb: "🎤🎶🎸",
    answer: "Live Music Concert",
    hints: "Enjoying performances by musicians",
    contains: ["live", "music", "concert"],
  },{
    emojicomb: "🏞️🚣‍♂️🔍",
    answer: "River Exploration Adventure",
    hints: "Searching for hidden wonders on water",
    contains: ["river", "exploration", "adventure"],
  },
  {
    emojicomb: "🚁🏔️📸",
    answer: "Helicopter Mountain Photography",
    hints: "Aerial shots of breathtaking peaks",
    contains: ["helicopter", "mountain", "photography"],
  },
  {
    emojicomb: "🎉🥳🎈",
    answer: "Celebration Party Time",
    hints: "Festive gathering for joyous moments",
    contains: ["celebration", "party", "time"],
  },
  {
    emojicomb: "🏰🎭🤴",
    answer: "Medieval Theater King",
    hints: "Royal drama in historical times",
    contains: ["medieval", "theater", "king"],
  },
  {
    emojicomb: "🌍🔭🚀",
    answer: "Space Exploration Telescope",
    hints: "Observing the cosmos with advanced optics",
    contains: ["space", "exploration", "telescope"],
  },
  {
    emojicomb: "🎭🎨🖼️",
    answer: "Art Gallery Exhibition",
    hints: "Display of creative works in a cultural space",
    contains: ["art", "gallery", "exhibition"],
  },
  {
    emojicomb: "🌊🏄‍♂️🌴",
    answer: "Surfing Beach Paradise",
    hints: "Riding waves in a tropical haven",
    contains: ["surfing", "beach", "paradise"],
  },
  {
    emojicomb: "🚢🌅🏝️",
    answer: "Cruise Sunset Island",
    hints: "Sailing into the evening near a tropical isle",
    contains: ["cruise", "sunset", "island"],
  },
  {
    emojicomb: "🏰👑👰",
    answer: "Fairytale Wedding Castle",
    hints: "Magical ceremony in a royal setting",
    contains: ["fairytale", "wedding", "castle"],
  },
  {
    emojicomb: "🚗🏞️🗺️",
    answer: "Road Trip Map Adventure",
    hints: "Navigating through diverse landscapes",
    contains: ["road", "trip", "map", "adventure"],
  },
  {
    emojicomb: "🌌👩‍🚀🛰️",
    answer: "Space Explorer Astronaut",
    hints: "Astronomical journey beyond Earth",
    contains: ["space", "explorer", "astronaut"],
  },
  {
    emojicomb: "🍕🏟️🎤",
    answer: "Pizza Stadium Concert",
    hints: "Enjoying live music with a slice",
    contains: ["pizza", "stadium", "concert"],
  },
  {
    emojicomb: "🍔🏭🔧",
    answer: "Burger Factory Assembly",
    hints: "Constructing delicious creations in a fast-food setting",
    contains: ["burger", "factory", "assembly"],
  },
  {
    emojicomb: "📚📖📝",
    answer: "Book Writing Workshop",
    hints: "Creating literary masterpieces in a collaborative setting",
    contains: ["book", "writing", "workshop"],
  },
  {
    emojicomb: "🌄🏰👸",
    answer: "Castle Princess Sunrise",
    hints: "Regal dawn in a majestic fortress",
    contains: ["castle", "princess", "sunrise"],
  },
  {
    emojicomb: "🚀🌌🛸",
    answer: "UFO Space Travel",
    hints: "Extraterrestrial journey in an unidentified flying object",
    contains: ["UFO", "space", "travel"],
  },
  {
    emojicomb: "📚📆🎓",
    answer: "Calendar Graduation Date",
    hints: "Marking the day of educational achievement",
    contains: ["calendar", "graduation", "date"],
  },
  {
    emojicomb: "🚴‍♂️🏞️🍃",
    answer: "Cycling Nature Trail",
    hints: "Biking through scenic paths",
    contains: ["cycling", "nature", "trail"],
  },
  {
    emojicomb: "🍹🏝️🌞",
    answer: "Tropical Cocktail Sunshine",
    hints: "Enjoying a fruity drink under the sun",
    contains: ["tropical", "cocktail", "sunshine"],
  },
  {
    emojicomb: "📷🌅📸",
    answer: "Sunset Photography Session",
    hints: "Capturing the beauty of the evening skies",
    contains: ["sunset", "photography", "session"],
  },{
    emojicomb: "🏰📖🔍",
    answer: "Castle Mystery Book",
    hints: "Reading about enigmatic fortress secrets",
    contains: ["castle", "mystery", "book"],
  },
  {
    emojicomb: "🍝🍷🕯️",
    answer: "Italian Dinner by Candlelight",
    hints: "Romantic meal with Mediterranean cuisine",
    contains: ["italian", "dinner", "candlelight"],
  },
  {
    emojicomb: "🎈🎊🎁",
    answer: "Balloon Party Surprise",
    hints: "Celebratory gathering with inflated decorations",
    contains: ["balloon", "party", "surprise"],
  },
  {
    emojicomb: "🎮🌌🚀",
    answer: "Space Adventure Game",
    hints: "Virtual exploration beyond the stars",
    contains: ["space", "adventure", "game"],
  },
  {
    emojicomb: "🚤🏞️🌅",
    answer: "Boat Tour Sunset",
    hints: "Nautical excursion during the evening",
    contains: ["boat", "tour", "sunset"],
  },
  {
    emojicomb: "🎨🖌️🏰",
    answer: "Artistic Castle Painting",
    hints: "Creating a visual masterpiece of a fortress",
    contains: ["artistic", "castle", "painting"],
  },
  {
    emojicomb: "🚗🌲🏞️",
    answer: "Car Camping Adventure",
    hints: "Outdoor sleepover in nature with a vehicle",
    contains: ["car", "camping", "adventure"],
  },
  {
    emojicomb: "🌊🏖️🏄‍♀️",
    answer: "Beach Surfing Vacation",
    hints: "Waves and sand for an active getaway",
    contains: ["beach", "surfing", "vacation"],
  },
  {
    emojicomb: "👩‍🍳🍣🍱",
    answer: "Sushi Chef Culinary Delight",
    hints: "Japanese cuisine crafted by a skilled cook",
    contains: ["sushi", "chef", "culinary", "delight"],
  },
  {
    emojicomb: "🚴‍♂️🌄🌲",
    answer: "Cycling at Sunrise in the Forest",
    hints: "Early morning bike ride through wooded trails",
    contains: ["cycling", "sunrise", "forest"],
  },
  {
    emojicomb: "🚁📸🏞️",
    answer: "Aerial Landscape Photography",
    hints: "Capturing the beauty from high above",
    contains: ["aerial", "landscape", "photography"],
  },
  {
    emojicomb: "🌆🍕🎤",
    answer: "City Pizza Karaoke Night",
    hints: "Singing and pizza in an urban setting",
    contains: ["city", "pizza", "karaoke", "night"],
  },
  {
    emojicomb: "🏰🔍🕵️‍♂️",
    answer: "Castle Detective Investigation",
    hints: "Solving mysteries within fortress walls",
    contains: ["castle", "detective", "investigation"],
  },
  {
    emojicomb: "🎬🍿👻",
    answer: "Horror Movie Popcorn Night",
    hints: "Scary film with a classic cinema snack",
    contains: ["horror", "movie", "popcorn", "night"],
  },
  {
    emojicomb: "🏰🌊🚢",
    answer: "Castle by the Sea Cruise",
    hints: "Seaside journey to a fortress",
    contains: ["castle", "sea", "cruise"],
  },
  {
    emojicomb: "📚🎓💼",
    answer: "Graduation Career Beginnings",
    hints: "Commencement into professional life",
    contains: ["graduation", "career", "beginnings"],
  },
  {
    emojicomb: "🌄🚗🛣️",
    answer: "Sunrise Road Trip Adventure",
    hints: "Early morning journey on the open road",
    contains: ["sunrise", "road", "trip", "adventure"],
  },
  {
    emojicomb: "🚤🏰🏞️",
    answer: "Castle Lake Boat Tour",
    hints: "Water tour around a fortress in scenic surroundings",
    contains: ["castle", "lake", "boat", "tour"],
  },
  {
    emojicomb: "🍹🌴🌞",
    answer: "Tropical Drink Sunshine",
    hints: "Refreshing beverage in a sunny paradise",
    contains: ["tropical", "drink", "sunshine"],
  },
  {
    emojicomb: "📸🏰🌄",
    answer: "Castle Sunset Photoshoot",
    hints: "Capturing the magical twilight ambiance",
    contains: ["castle", "sunset", "photoshoot"],
  },
  {
    emojicomb: "🌊📖",
    answer: "Sea Story",
    hints: "Adventure tale",
    contains: ["sea", "story"],
  },
  {
    emojicomb: "🌞🔍",
    answer: "Sunshine",
    hints: "Brings light and warmth",
    contains: ["sun", "shine"],
  },
  {
    emojicomb: "👣🚶‍♂️",
    answer: "Footprints",
    hints: "Traces of a journey",
    contains: ["foot", "prints"],
  },
  {
    emojicomb: "🍕🍔🍟",
    answer: "Fast Food",
    hints: "Quick and convenient meals",
    contains: ["fast", "food"],
  },
  {
    emojicomb: "🎭🎲",
    answer: "Play-Dice",
    hints: "Game involving chance and acting",
    contains: ["play", "dice"],
  },
  {
    emojicomb: "🚗📚",
    answer: "Car Manual",
    hints: "Guide for vehicle operation",
    contains: ["car", "manual"],
  },
  {
    emojicomb: "🎤🏠",
    answer: "House Party",
    hints: "Celebration at home",
    contains: ["house", "party"],
  },
  {
    emojicomb: "🧠💭",
    answer: "Mind Over Matter",
    hints: "Philosophical concept",
    contains: ["mind", "over", "matter"],
  },
  {
    emojicomb: "🌲🏠",
    answer: "Treehouse",
    hints: "Childhood hideaway",
    contains: ["tree", "house"],
  },
  {
    emojicomb: "🚢📆",
    answer: "Ship Calendar",
    hints: "Sailor's schedule",
    contains: ["ship", "calendar"],
  },
  {
    emojicomb: "🌈🦄",
    answer: "Rainbow Unicorn",
    hints: "Mythical creature in color",
    contains: ["rainbow", "unicorn"],
  },
  {
    emojicomb: "🍎🍏🍐",
    answer: "Fruit Salad",
    hints: "Mix of healthy snacks",
    contains: ["fruit", "salad"],
  },
  {
    emojicomb: "🎸🔍🔊",
    answer: "Rock Search Sound",
    hints: "Music exploration",
    contains: ["rock", "search", "sound"],
  },
  {
    emojicomb: "🎨🍀",
    answer: "Art Lucky",
    hints: "Fortunate creative expression",
    contains: ["art", "lucky"],
  },
  {
    emojicomb: "🕰️🌍",
    answer: "Time Travel",
    hints: "Fictional journey through history",
    contains: ["time", "travel"],
  },
  {
    emojicomb: "🌙🚶‍♂️🚶‍♀️",
    answer: "Moonwalkers",
    hints: "Nighttime stroll enthusiasts",
    contains: ["moon", "walkers"],
  },
  {
    emojicomb: "🎾🌊👀",
    answer: "Tennis Sea View",
    hints: "Scenic court by the ocean",
    contains: ["tennis", "sea", "view"],
  },
  {
    emojicomb: "🌲🍃🐿️",
    answer: "Forest Squirrel",
    hints: "Tree-dwelling rodent",
    contains: ["forest", "squirrel"],
  },
  {
    emojicomb: "🕰️🐇🕳️",
    answer: "Time Rabbit Hole",
    hints: "Temporal adventure entrance",
    contains: ["time", "rabbit", "hole"],
  },
  {
    emojicomb: "🚴‍♂️🔊🏞️",
    answer: "Bike Soundscapes",
    hints: "Cycling through nature's symphony",
    contains: ["bike", "soundscapes"],
  },
  {
    emojicomb: "🍕🏰👸",
    answer: "Pizza Castle Princess",
    hints: "Royal dinner choice",
    contains: ["pizza", "castle", "princess"],
  },
  {
    emojicomb: "🚀🌌👾",
    answer: "Rocket Space Invader",
    hints: "Extraterrestrial gaming adventure",
    contains: ["rocket", "space", "invader"],
  },
  {
    emojicomb: "🌈🔍🍭",
    answer: "Rainbow Search Candy",
    hints: "Seeking sweet colors",
    contains: ["rainbow", "search", "candy"],
  },
  {
    emojicomb: "🎻🎨🌆",
    answer: "Violin Art City",
    hints: "Musical masterpiece in urban setting",
    contains: ["violin", "art", "city"],
  },
  {
    emojicomb: "🍎🍋🌶️",
    answer: "Fruit Spicy",
    hints: "Tangy and hot natural snack",
    contains: ["fruit", "spicy"],
  },
  {
    emojicomb: "📚✉️📬",
    answer: "Book Mailbox",
    hints: "Literary correspondence point",
    contains: ["book", "mailbox"],
  },
  {
    emojicomb: "🎭🍬🎃",
    answer: "Candy Mask Halloween",
    hints: "Trick-or-treat disguise",
    contains: ["candy", "mask", "halloween"],
  },
  {
    emojicomb: "🧠🚶‍♂️🏞️",
    answer: "Mind Walker Landscape",
    hints: "Mental exploration in nature",
    contains: ["mind", "walker", "landscape"],
  },
  {
    emojicomb: "🏰🎲👻",
    answer: "Castle Dice Ghost",
    hints: "Spooky game in a medieval fortress",
    contains: ["castle", "dice", "ghost"],
  },
  {
    emojicomb: "🚲🌍🎶",
    answer: "Bike Earth Melody",
    hints: "Pedaling to the rhythm of the world",
    contains: ["bike", "earth", "melody"],
  },
  {
    emojicomb: "🌙🚶‍♂️🚶‍♀️👣",
    answer: "Moonwalkers Footprints",
    hints: "Nighttime stroll tracks",
    contains: ["moon", "walkers", "footprints"],
  },
  {
    emojicomb: "🎾🌊👀🌅",
    answer: "Tennis Sea View Sunrise",
    hints: "Scenic court by the ocean with morning glow",
    contains: ["tennis", "sea", "view", "sunrise"],
  },
  {
    emojicomb: "🌲🍃🐿️🌳",
    answer: "Forest Squirrel Tree",
    hints: "Arboreal rodent habitat",
    contains: ["forest", "squirrel", "tree"],
  },
  {
    emojicomb: "🕰️🐇🕳️🕰️",
    answer: "Time Rabbit Hole Time",
    hints: "Temporal adventure with a repetitive twist",
    contains: ["time", "rabbit", "hole", "time"],
  },
  {
    emojicomb: "🚴‍♂️🔊🏞️🌳",
    answer: "Bike Soundscapes Nature",
    hints: "Cycling through symphonies of the great outdoors",
    contains: ["bike", "soundscapes", "nature"],
  },
  {
    emojicomb: "🍕🏰👸🍕",
    answer: "Pizza Castle Princess Pizza",
    hints: "Royally indulging in everyone's favorite dish",
    contains: ["pizza", "castle", "princess", "pizza"],
  },
  {
    emojicomb: "🚀🌌👾🌌",
    answer: "Rocket Space Invader Galaxy",
    hints: "Extraterrestrial gaming adventure among the stars",
    contains: ["rocket", "space", "invader", "galaxy"],
  },
  {
    emojicomb: "🌈🔍🍭🌧️",
    answer: "Rainbow Search Candy Rain",
    hints: "Seeking sweet colors under a shower of sweetness",
    contains: ["rainbow", "search", "candy", "rain"],
  },
  {
    emojicomb: "🎻🎨🌆🌃",
    answer: "Violin Art City Night",
    hints: "Musical masterpiece in an urban setting after dark",
    contains: ["violin", "art", "city", "night"],
  },
  {
    emojicomb: "🍎🍋🌶️🍕",
    answer: "Fruit Spicy Pizza",
    hints: "Tangy and hot natural snack on a favorite dish",
    contains: ["fruit", "spicy", "pizza"],
  },
  {
    emojicomb: "📚✉️📬📖",
    answer: "Book Mailbox Book",
    hints: "Literary correspondence point featuring a reading material",
    contains: ["book", "mailbox", "book"],
  },
  {
    emojicomb: "🎭🍬🎃🎭",
    answer: "Candy Mask Halloween Mask",
    hints: "Trick-or-treat disguise, doubling up for the occasion",
    contains: ["candy", "mask", "halloween", "mask"],
  },
  {
    emojicomb: "🧠🚶‍♂️🏞️🧠",
    answer: "Mind Walker Landscape Mind",
    hints: "Mental exploration in nature with a thoughtful twist",
    contains: ["mind", "walker", "landscape", "mind"],
  },
  {
    emojicomb: "🏰🎲👻🏰",
    answer: "Castle Dice Ghost Castle",
    hints: "Spooky game in a medieval fortress with a repeating element",
    contains: ["castle", "dice", "ghost", "castle"],
  },
  {
    emojicomb: "🚲🌍🎶🚲",
    answer: "Bike Earth Melody Bike",
    hints: "Pedaling to the rhythm of the world with a repeated theme",
    contains: ["bike", "earth", "melody", "bike"],
  },
  {
    emojicomb: "🌌🔭👽🚀",
    answer: "Galaxy Telescope Alien Rocket",
    hints: "Stargazing device detects extraterrestrial launch",
    contains: ["galaxy", "telescope", "alien", "rocket"],
  },
  {
    emojicomb: "🍦🍰🎉🎁",
    answer: "Ice Cream Cake Celebration Gift",
    hints: "Sweet treat layered with joy and presents",
    contains: ["ice cream", "cake", "celebration", "gift"],
  },
  {
    emojicomb: "🎭🎬🕵️‍♂️🔍",
    answer: "Theater Film Detective Search",
    hints: "Performance on screen involves a sleuthing quest",
    contains: ["theater", "film", "detective", "search"],
  },
  {
    emojicomb: "🚢🏴‍☠️💰🌊",
    answer: "Pirate Ship Treasure Sea",
    hints: "Seafaring buccaneers hunting for riches on the waves",
    contains: ["pirate", "ship", "treasure", "sea"],
  },
  {
    emojicomb: "🚗🛣️🏞️🔍",
    answer: "Road Trip Landscape Search",
    hints: "Journey across scenic terrain with a quest for discovery",
    contains: ["road", "trip", "landscape", "search"],
  },
  {
    emojicomb: "🏰👻🗝️🚪",
    answer: "Castle Ghost Key Door",
    hints: "Haunted fortress entrance requires a spectral key",
    contains: ["castle", "ghost", "key", "door"],
  },
  {
    emojicomb: "🌵🏜️🔥🏜️",
    answer: "Desert Heat Desert",
    hints: "Scorching temperatures in an arid sandy expanse",
    contains: ["desert", "heat", "desert"],
  },
  {
    emojicomb: "🐘🎨🌈🎈",
    answer: "Elephant Art Rainbow Balloon",
    hints: "Creative pachyderm adds colors to the skies with a party touch",
    contains: ["elephant", "art", "rainbow", "balloon"],
  },
  {
    emojicomb: "🏹🍎🎯🍏",
    answer: "Arrow Apple Target Apple",
    hints: "Precision sport involves hitting the bullseye with fruit projectiles",
    contains: ["arrow", "apple", "target", "apple"],
  },
  {
    emojicomb: "🌊🚤🔍🏴‍☠️",
    answer: "Ocean Speedboat Search Pirate",
    hints: "High-speed watercraft explores the seas on a treasure hunt",
    contains: ["ocean", "speedboat", "search", "pirate"],
  },
  {
    emojicomb: "🌲🦌🌄🍂",
    answer: "Forest Deer Sunrise Autumn",
    hints: "Woodland creature greets the morning in the fall season",
    contains: ["forest", "deer", "sunrise", "autumn"],
  },
  {
    emojicomb: "👨‍🍳🍲🌶️🔥",
    answer: "Chef Soup Spicy Fire",
    hints: "Culinary expert prepares a hot and flavorful dish",
    contains: ["chef", "soup", "spicy", "fire"],
  },
  {
    emojicomb: "🎤🎸🎶🎉",
    answer: "Microphone Guitar Music Celebration",
    hints: "Instruments and vocals join forces for a joyous musical event",
    contains: ["microphone", "guitar", "music", "celebration"],
  },
  {
    emojicomb: "🚁🏔️🏞️🏰",
    answer: "Helicopter Mountain Landscape Castle",
    hints: "Aerial transport explores scenic views and a medieval fortress",
    contains: ["helicopter", "mountain", "landscape", "castle"],
  },
  {
    emojicomb: "🌍🎭🔍📚",
    answer: "World Theater Search Book",
    hints: "Global exploration of the performing arts leads to a literary discovery",
    contains: ["world", "theater", "search", "book"],
  },
  {
    emojicomb: "🔍🔬🧪🔭",
    answer: "Search Microscope Experiment Telescope",
    hints: "Scientific investigation involves tools for observation and analysis",
    contains: ["search", "microscope", "experiment", "telescope"],
  },
  {
    emojicomb: "🚗🛣️🌅🏞️",
    answer: "Road Sunrise Landscape",
    hints: "Driving into the early morning in a picturesque setting",
    contains: ["road", "sunrise", "landscape"],
  },
  {
    emojicomb: "🌌🌠🔍🧩",
    answer: "Galaxy Stars Search Puzzle",
    hints: "Hunting for celestial objects in the cosmic jigsaw",
    contains: ["galaxy", "stars", "search", "puzzle"],
  },
  {
    emojicomb: "🐦🌲🍂🏡",
    answer: "Bird Forest Autumn Home",
    hints: "Feathered friend enjoys the fall season near a residence",
    contains: ["bird", "forest", "autumn", "home"],
  },
  {
    emojicomb: "🎨🔥🌅🖼️",
    answer: "Art Fire Sunrise Painting",
    hints: "Canvas ablaze with colors inspired by the morning sky",
    contains: ["art", "fire", "sunrise", "painting"],
  },
  {
    emojicomb: "🌊🎣🐟🚣‍♂️",
    answer: "Ocean Fishing Fish Rowing",
    hints: "Catching aquatic creatures while navigating the waters",
    contains: ["ocean", "fishing", "fish", "rowing"],
  },
  {
    emojicomb: "🚁🌄🌆🏙️",
    answer: "Helicopter Sunrise Cityscape",
    hints: "Aerial view of the urban landscape as the sun rises",
    contains: ["helicopter", "sunrise", "cityscape"],
  },
  {
    emojicomb: "🏰🌲🐉🗝️",
    answer: "Castle Forest Dragon Key",
    hints: "Mythical creature guards a secret entrance in the woods",
    contains: ["castle", "forest", "dragon", "key"],
  },
  {
    emojicomb: "🍇🍷🍾🎉",
    answer: "Grapes Wine Champagne Celebration",
    hints: "Festive toast with sparkling beverages made from vine fruits",
    contains: ["grapes", "wine", "champagne", "celebration"],
  },
  {
    emojicomb: "🏞️👨‍👩‍👧‍👦🚶‍♂️🐕",
    answer: "Landscape Family Stroll Dog",
    hints: "Scenic walk with loved ones and a faithful four-legged friend",
    contains: ["landscape", "family", "stroll", "dog"],
  },
  {
    emojicomb: "🌳🐿️🌰🍁",
    answer: "Tree Squirrel Acorn Autumn",
    hints: "Furry critter gathering nuts beneath the fall foliage",
    contains: ["tree", "squirrel", "acorn", "autumn"],
  },
  {
    emojicomb: "🚂🏞️🌄🌌",
    answer: "Train Landscape Sunrise Galaxy",
    hints: "Journeying through changing scenery from daybreak to the night sky",
    contains: ["train", "landscape", "sunrise", "galaxy"],
  },
  {
    emojicomb: "🍔🍟🎬🎭",
    answer: "Fast Food Movie Theater",
    hints: "Combining a quick meal with a film at the cinema",
    contains: ["fast food", "movie", "theater"],
  },
  {
    emojicomb: "🌞🏝️🏄‍♂️🌊",
    answer: "Sun Island Surfer Wave",
    hints: "Riding the ocean waves under the tropical sun",
    contains: ["sun", "island", "surfer", "wave"],
  },
  {
    emojicomb: "🚀🎆🌌🌠",
    answer: "Rocket Fireworks Galaxy Stars",
    hints: "Celestial display launched into the cosmos with pyrotechnics",
    contains: ["rocket", "fireworks", "galaxy", "stars"],
  },{
    emojicomb: "🏰🐉🔮🚪🗝️",
    answer: "Castle Dragon Crystal Door Key",
    hints: "Magical fortress guarded by a mythical creature, protected with enchanted items",
    contains: ["castle", "dragon", "crystal", "door", "key"],
  },
  {
    emojicomb: "🌍🚀🔭🌌🌠",
    answer: "Earth Rocket Telescope Galaxy Stars",
    hints: "Exploring the cosmos from our planet using advanced astronomical instruments",
    contains: ["earth", "rocket", "telescope", "galaxy", "stars"],
  },
  {
    emojicomb: "🦸‍♂️🌊💧🔥🌪️",
    answer: "Superhero Water Fire Air",
    hints: "Capable character with powers over the basic elements",
    contains: ["superhero", "water", "fire", "air"],
  },
  {
    emojicomb: "🌈📚📖🎨🔍",
    answer: "Rainbow Book Literature Art Search",
    hints: "Exploring a spectrum of creative works in the pursuit of knowledge",
    contains: ["rainbow", "book", "literature", "art", "search"],
  },
  {
    emojicomb: "🌲🎵🐦🌳🎶",
    answer: "Forest Music Bird Tree Melody",
    hints: "Singing woodland creature harmonizes with the natural soundscape",
    contains: ["forest", "music", "bird", "tree", "melody"],
  },
  {
    emojicomb: "🍦🍫🎉🎁🎂",
    answer: "Ice Cream Chocolate Celebration Gift Cake",
    hints: "Indulging in sweet treats during a joyous occasion",
    contains: ["ice cream", "chocolate", "celebration", "gift", "cake"],
  },
  {
    emojicomb: "🌞🌊🏄‍♀️🌴🍹",
    answer: "Sun Ocean Surfer Palm Tree Cocktail",
    hints: "Enjoying the beach life with waves, a board, tropical vegetation, and a refreshing drink",
    contains: ["sun", "ocean", "surfer", "palm tree", "cocktail"],
  },
  {
    emojicomb: "🌍📚🚀🌌👽",
    answer: "World Literature Rocket Galaxy Alien",
    hints: "Venturing into the unknown realms of space with literary inspiration",
    contains: ["world", "literature", "rocket", "galaxy", "alien"],
  },
  {
    emojicomb: "🌲🚶‍♂️📚🏞️👀",
    answer: "Nature Walker Book Landscape View",
    hints: "Strolling through scenic surroundings while engrossed in reading",
    contains: ["nature", "walker", "book", "landscape", "view"],
  },
  {
    emojicomb: "🏰👑🛡️🗝️💎",
    answer: "Castle Crown Shield Key Jewel",
    hints: "Royal fortress secured with regal symbols and precious gems",
    contains: ["castle", "crown", "shield", "key", "jewel"],
  },
  {
    emojicomb: "🌌👀🔍🚪🔓",
    answer: "Galaxy Eyes Search Door Unlock",
    hints: "Searching the cosmic expanse with a focus on discovering a way to open a portal",
    contains: ["galaxy", "eyes", "search", "door", "unlock"],
  },
  {
    emojicomb: "🔍🗺️🧭👣🚶‍♂️",
    answer: "Search Map Compass Footprints Walker",
    hints: "Navigating the world with tools, leaving traces of a journey on foot",
    contains: ["search", "map", "compass", "footprints", "walker"],
  },
  {
    emojicomb: "🚗🏞️🌅🚵‍♂️🚴‍♂️",
    answer: "Car Landscape Sunrise Mountain Biking",
    hints: "Driving through picturesque scenery to reach a high-altitude trail for cycling",
    contains: ["car", "landscape", "sunrise", "mountain biking"],
  },
  {
    emojicomb: "🏞️🏰👻🔍🗝️",
    answer: "Landscape Castle Ghost Search Key",
    hints: "Scenic view surrounding a haunted fortress, searching for a hidden entrance",
    contains: ["landscape", "castle", "ghost", "search", "key"],
  },
  {
    emojicomb: "🌈🏠🚪💼👋",
    answer: "Rainbow Home Door Briefcase Goodbye",
    hints: "Leaving a colorful abode with a farewell gesture and belongings in hand",
    contains: ["rainbow", "home", "door", "briefcase", "goodbye"],
  },
  {
    emojicomb: "🎤🏟️🔊🎆👏",
    answer: "Microphone Stadium Sound Applause",
    hints: "Amplifying one's voice in a large arena, receiving enthusiastic applause",
    contains: ["microphone", "stadium", "sound", "applause"],
  },
  {
    emojicomb: "🍎🌲🌰🏡🎃",
    answer: "Apple Tree Acorn Home Pumpkin",
    hints: "Harvesting fall fruits and decorating the residence with a seasonal touch",
    contains: ["apple", "tree", "acorn", "home", "pumpkin"],
  },
  {
    emojicomb: "📖🔮🐉🗝️🚪",
    answer: "Book Crystal Dragon Key Door",
    hints: "Unlocking a magical entrance with a literary artifact and mythical guardians",
    contains: ["book", "crystal", "dragon", "key", "door"],
  },
  {
    emojicomb: "🌅🏞️👨‍👩‍👧‍👦🎉🎈",
    answer: "Sunrise Landscape Family Celebration Balloons",
    hints: "Commencing the day in a picturesque setting with loved ones and festive decorations",
    contains: ["sunrise", "landscape", "family", "celebration", "balloons"],
  },
  {
    emojicomb: "🚁🏰🌌🔮🌄",
    answer: "Helicopter Castle Galaxy Crystal Sunrise",
    hints: "Aerial view of a fortress with cosmic elements and a magical dawn",
    contains: ["helicopter", "castle", "galaxy", "crystal", "sunrise"],
  },
  {
    emojicomb: "🌲🚵‍♂️🏞️🔍🗺️",
    answer: "Forest Mountain Biking Landscape Search Map",
    hints: "Cycling through wooded terrain while exploring and following a map",
    contains: ["forest", "mountain biking", "landscape", "search", "map"],
  },
  {
    emojicomb: "🎨🖌️👨‍🎨",
    answer: "Art Paintbrush Artist",
    hints: "Creating masterpieces with a tool wielded by a skilled creator",
    contains: ["art", "paintbrush", "artist"],
  },
  {
    emojicomb: "🍕🍔🍟🏠",
    answer: "Fast Food House",
    hints: "Quick and convenient meals enjoyed within the comforts of a residence",
    contains: ["fast food", "house"],
  },
  {
    emojicomb: "🌈📚🔍🔮",
    answer: "Rainbow Book Search Magic",
    hints: "Exploring literature in search of enchanted knowledge and hidden wonders",
    contains: ["rainbow", "book", "search", "magic"],
  },
  {
    emojicomb: "🍦🍰🎂🎉",
    answer: "Ice Cream Cake Celebration",
    hints: "Sweet treats marking a joyous occasion with festivities",
    contains: ["ice cream", "cake", "celebration"],
  },
  {
    emojicomb: "🚀🌌👾🎮",
    answer: "Rocket Galaxy Alien Gaming",
    hints: "Embarking on extraterrestrial adventures through the medium of video games",
    contains: ["rocket", "galaxy", "alien", "gaming"],
  },
  {
    emojicomb: "🍔🌱🍅🥑",
    answer: "Vegetarian Burger",
    hints: "Burger made entirely from plant-based ingredients",
    contains: ["vegetarian", "burger"],
  },
  {
    emojicomb: "🏰🗝️🔒👸",
    answer: "Castle Key Locked Princess",
    hints: "Regal fortress with a secure entrance and a royal resident",
    contains: ["castle", "key", "locked", "princess"],
  },
  {
    emojicomb: "🎭🎲🕹️🃏",
    answer: "Play-Dice Game Console Card",
    hints: "Entertainment involving chance and strategy, played on various platforms",
    contains: ["play", "dice", "game console", "card"],
  },
  {
    emojicomb: "🌲🏠🌳🏡",
    answer: "Treehouse House Tree Home",
    hints: "Elevated hideaway nestled within the branches of a living structure",
    contains: ["treehouse", "house", "tree", "home"],
  },
  {
    emojicomb: "🚗📚🌲📖",
    answer: "Car Manual Forest Book",
    hints: "Guide for vehicle operation within the pages of a book amidst the trees",
    contains: ["car", "manual", "forest", "book"],
  },
  {
    emojicomb: "🎤🎶🏞️🌄",
    answer: "Music Landscape Sunrise",
    hints: "Melodic sounds accompanying the visual spectacle of daybreak",
    contains: ["music", "landscape", "sunrise"],
  },
  {
    emojicomb: "🍕🔥🌶️🔥",
    answer: "Spicy Pizza Fire",
    hints: "Hot and flavorful dish topped with fiery ingredients",
    contains: ["spicy", "pizza", "fire"],
  },
  {
    emojicomb: "🎸🔍📜🎵",
    answer: "Rock Search Sheet Music",
    hints: "Hunting for musical notes in the world of rock and roll",
    contains: ["rock", "search", "sheet music", "music"],
  },
  {
    emojicomb: "🚢🗓️🚶‍♂️🛳️",
    answer: "Ship Calendar Walker Cruise",
    hints: "Sailor's schedule during a leisurely sea journey",
    contains: ["ship", "calendar", "walker", "cruise"],
  },
  {
    emojicomb: "🌈🦄📚📖",
    answer: "Rainbow Unicorn Book Literature",
    hints: "Mythical creature associated with enchanting tales in literature",
    contains: ["rainbow", "unicorn", "book", "literature"],
  },
  {
    emojicomb: "🎨🍀🖼️🍀",
    answer: "Art Lucky Painting Lucky",
    hints: "Creating fortunate masterpieces with a stroke of luck",
    contains: ["art", "lucky", "painting", "lucky"],
  },
  {
    emojicomb: "🕰️🌍🌐📆",
    answer: "Time Travel World Calendar",
    hints: "Fictional journey through history with a global schedule",
    contains: ["time", "travel", "world", "calendar"],
  },
  {
    emojicomb: "🏰🚢🌅👑",
    answer: "Castle Cruise Sunrise Crown",
    hints: "Regal vessel embarking on a sea journey at the break of dawn",
    contains: ["castle", "cruise", "sunrise", "crown"],
  },
  {
    emojicomb: "🚗📖📚🗺️",
    answer: "Car Book Literature Map",
    hints: "Literary exploration within the confines of a vehicle, guided by a map",
    contains: ["car", "book", "literature", "map"],
  },
  {
    emojicomb: "🌊🏝️👣🌅",
    answer: "Ocean Island Footprints Sunrise",
    hints: "Traces left behind on a sandy shore during the early morning",
    contains: ["ocean", "island", "footprints", "sunrise"],
  },
  {
    emojicomb: "🏞️🏰🗝️🔓",
    answer: "Landscape Castle Key Unlock",
    hints: "Unlocking a scenic fortress with a key to reveal hidden wonders",
    contains: ["landscape", "castle", "key", "unlock"],
  },
  {
    emojicomb: "🚀🌠🌌👾🎮",
    answer: "Rocket Stars Galaxy Alien Gaming",
    hints: "Embarking on a gaming adventure in a cosmic realm with extraterrestrial entities",
    contains: ["rocket", "stars", "galaxy", "alien", "gaming"],
  },
  {
    emojicomb: "🏰🔮👑🚪",
    answer: "Castle Magic Crown Door",
    hints: "Regal fortress adorned with mystical symbols, guarded by a magical entrance",
    contains: ["castle", "magic", "crown", "door"],
  },
  {
    emojicomb: "🍇🍷🍾🎉🥳",
    answer: "Grapes Wine Champagne Celebration Party",
    hints: "Toasting to joyous occasions with festive beverages made from vine fruits",
    contains: ["grapes", "wine", "champagne", "celebration", "party"],
  },
  {
    emojicomb: "🏞️🚵‍♀️🌲🔍",
    answer: "Landscape Mountain Biking Forest Search",
    hints: "Scenic trail through wooded terrain, searching for hidden gems",
    contains: ["landscape", "mountain biking", "forest", "search"],
  },
  {
    emojicomb: "🌊🛳️🏖️🌅",
    answer: "Ocean Cruise Beach Sunrise",
    hints: "Sailing on the sea to reach a sandy shore as the sun emerges on the horizon",
    contains: ["ocean", "cruise", "beach", "sunrise"],
  },
  {
    emojicomb: "🌌🔍📜📖",
    answer: "Galaxy Search Scroll Literature",
    hints: "Exploring the cosmic expanse in search of ancient scrolls containing literary wonders",
    contains: ["galaxy", "search", "scroll", "literature"],
  },
  {
    emojicomb: "🍜🥢🏯🏞️",
    answer: "Noodle Chopsticks Castle Landscape",
    hints: "Enjoying a traditional dish amidst a scenic view with a fortress in the background",
    contains: ["noodle", "chopsticks", "castle", "landscape"],
  },
  {
    emojicomb: "🏰📜🐉🗝️",
    answer: "Castle Scroll Dragon Key",
    hints: "Ancient document revealing the secret to unlocking a fortress guarded by a mythical creature",
    contains: ["castle", "scroll", "dragon", "key"],
  },
  {
    emojicomb: "🌲🚶‍♂️🍃🔍",
    answer: "Forest Walker Leaves Search",
    hints: "Strolling through the woods, searching for clues among fallen foliage",
    contains: ["forest", "walker", "leaves", "search"],
  },
  {
    emojicomb: "🚗🌲📚🗺️",
    answer: "Car Forest Book Map",
    hints: "Driving through wooded terrain, engrossed in literature and guided by a map",
    contains: ["car", "forest", "book", "map"],
  },
  {
    emojicomb: "🌄🚴‍♂️🏞️👀",
    answer: "Sunrise Biking Landscape View",
    hints: "Cycling through a picturesque setting, captivated by the scenic panorama",
    contains: ["sunrise", "biking", "landscape", "view"],
  },
  {
    emojicomb: "🍨🍰🏰🎉",
    answer: "Dessert Castle Celebration Party",
    hints: "Sweet treats served in a regal fortress during a joyous occasion",
    contains: ["dessert", "castle", "celebration", "party"],
  },
  {
    emojicomb: "🌳🐇🕳️🐰",
    answer: "Tree Rabbit Hole Bunny",
    hints: "Woodland creature exploring a burrow beneath a tree",
    contains: ["tree", "rabbit", "hole", "bunny"],
  },
  {
    emojicomb: "🎭🎶🌆🕺",
    answer: "Theater Music City Dance",
    hints: "Performing arts and rhythmic movements in the urban setting of a city",
    contains: ["theater", "music", "city", "dance"],
  },
  {
    emojicomb: "🚀🎵🌌🌠",
    answer: "Rocket Music Galaxy Stars",
    hints: "Cosmic journey accompanied by a musical soundtrack among celestial bodies",
    contains: ["rocket", "music", "galaxy", "stars"],
  },
  {
    emojicomb: "🌊🐠🐚🏖️",
    answer: "Ocean Fish Shell Beach",
    hints: "Marine life and seashells found on the sandy shores of a beach by the sea",
    contains: ["ocean", "fish", "shell", "beach"],
  },
  {
    emojicomb: "🏰🌲👣🏞️",
    answer: "Castle Forest Footprints Landscape",
    hints: "Traces leading to a regal fortress within a wooded and scenic environment",
    contains: ["castle", "forest", "footprints", "landscape"],
  },
  {
    emojicomb: "🚗🌄🏞️🗺️",
    answer: "Car Sunrise Landscape Map",
    hints: "Driving through changing scenery in the early morning, guided by a map",
    contains: ["car", "sunrise", "landscape", "map"],
  },
  {
    emojicomb: "🏹🍁🍂🎯",
    answer: "Arrow Autumn Leaves Target",
    hints: "Precision sport involving hitting a target adorned with fall foliage",
    contains: ["arrow", "autumn", "leaves", "target"],
  },
  {
    emojicomb: "🍔🍟🎥🍿",
    answer: "Fast Food Movie Popcorn",
    hints: "Combining a quick meal with a film at the cinema, complete with a popular snack",
    contains: ["fast food", "movie", "popcorn"],
  },
  {
    emojicomb: "🏰🔍🔒🗝️",
    answer: "Castle Search Locked Key",
    hints: "Hunting for clues within a fortress that is securely locked, requiring a key",
    contains: ["castle", "search", "locked", "key"],
  },
];

const Sigma = () => {
  const [riddles, setRiddles] = useState([]);
  const [currentRiddleIndex, setCurrentRiddleIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);

  useEffect(() => {
    // Shuffle the array of riddles
    const shuffledRiddles = [...emojiRiddles].sort(() => Math.random() - 0.5);
    setRiddles(shuffledRiddles);
  }, []);

  const checkAnswer = () => {
    const currentRiddle = riddles[currentRiddleIndex];
    const correctAnswer = currentRiddle.answer.toUpperCase();
    const userGuess = userInput.trim().toUpperCase();

    if (userGuess === correctAnswer) {
      setFeedbackMessage("Correct! Great job! 🎉");
      setShowHint(false);
      // Enable the Next button
      setIsNextButtonDisabled(false);
    } else if (containsCorrectWords(userGuess, currentRiddle.contains)) {
      setFeedbackMessage(`Close, but not quite! ${showHint ? `Hint: ${currentRiddle.hints}` : ""}`);
    } else {
      setFeedbackMessage("Incorrect. Try again! 🤔");
      setShowHint(true);
      // Disable the Next button on incorrect attempts
      setIsNextButtonDisabled(true);
    }
  };

  const showAnswer = () => {
    const currentRiddle = riddles[currentRiddleIndex];
    setFeedbackMessage(`The answer is: ${currentRiddle.answer}`);
  };

  const containsCorrectWords = (userGuess, contains) => {
    return contains.some((word) => userGuess.includes(word.toUpperCase()));
  };

  const moveToNextRiddle = () => {
    // Move to the next riddle
    setCurrentRiddleIndex((prevIndex) => (prevIndex + 1) % riddles.length);
    // Clear the input for the next riddle
    setUserInput("");
    // Reset hint display
    setShowHint(false);
    // Disable the Next button for the next riddle
    setIsNextButtonDisabled(true);
    // Clear feedback message
    setFeedbackMessage("");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.emojiCombination}>{riddles[currentRiddleIndex]?.emojicomb}</Text>
        <Text style={styles.instructions}>
          Can you guess the meaning of the emojis above?
        </Text>
        {showHint && (
          <Text style={styles.hint}>
            Hint: {riddles[currentRiddleIndex]?.hints}
          </Text>
        )}
        <TextInput
          style={styles.input}
          placeholder="Your guess"
          value={userInput}
          onChangeText={(text) => setUserInput(text)}
        />
        <Text style={styles.feedbackMessage}>{feedbackMessage}</Text>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={checkAnswer} style={styles.button}>
          <FontAwesome5 name="check" size={30} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity onPress={showAnswer} style={styles.button}>
          <FontAwesome5 name="eye" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={moveToNextRiddle}
          style={[styles.button, { opacity: isNextButtonDisabled ? 0.5 : 1 }]}
          disabled={isNextButtonDisabled}
        >
          <FontAwesome5 name="arrow-alt-circle-right" size={30} color="green" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    top: 25,
    backgroundColor: "#FCECDD", // Light Peach background color
  },
  card: {
    backgroundColor: "#FFF4E0", // Cream background color
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: "relative",
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#FF9F80", // Coral button background color
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    flex: 1,
    margin: 5,
  },
  emojiCombination: {
    fontSize: 36, // Increased font size
    marginBottom: 20,
    textAlign: "center",
    color: "#FF6347", // Tomato color
    fontWeight: "bold", // Bold font
  },
  instructions: {
    fontSize: 18, // Increased font size
    textAlign: "center",
    marginBottom: 20,
    color: "#4A90E2", // Dodger Blue color
  },
  input: {
    borderColor: "#A9A9A9", // Dark Gray border color
    borderWidth: 2,
    padding: 15,
    marginBottom: 20,
    textAlign: "center",
    fontSize: 16, // Increased font size
  },
  feedbackMessage: {
    marginTop: 20,
    fontSize: 18, // Increased font size
    fontWeight: "bold",
    color: "#008000", // Dark Green color
    textAlign: "center",
  },
  hint: {
    fontSize: 16, // Increased font size
    fontStyle: "italic",
    color: "#555",
    marginTop: 10,
    textAlign: "center",
  },
});


export default Sigma;