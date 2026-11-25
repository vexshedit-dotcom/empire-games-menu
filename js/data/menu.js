/**
 * The whole menu lives here. To change a price, edit the number.
 * To add an item, copy a line inside the right group.
 *
 * Category fields:
 *   id      unique slug used in the URL (#/c/<id>)
 *   icon    emoji shown on the category card
 *   type    "standard" (default) or "hookah" (Babylon / German / wood pricing)
 *   groups  list of sub-sections; a group without `name` has no sub-title
 *
 * Item fields:
 *   ar / en   names
 *   price     single price (IQD)
 *   sizes     optional list of { size: <key in SIZES>, price } instead of price
 *   desc      optional { ar, en } small description under the name
 *   meal      true = can be turned into a meal (+ CONFIG.meal.extra)
 *   woodOnly  hookah only: available as wooden hookah only
 */

export const SIZES = {
  small: { ar: "صغير", en: "Small" },
  large: { ar: "كبير", en: "Large" },
};

export const MENU = [
  {
    id: "juices",
    icon: "🍊",
    name: { ar: "العصائر الطبيعية", en: "Fresh Juices" },
    groups: [
      {
        items: [
          { ar: "عصير البرتقال", en: "Orange Juice", price: 3000 },
          { ar: "عصير الفراولة", en: "Strawberry Juice", price: 3000 },
          { ar: "عصير ليمون", en: "Lemon Juice", price: 3000 },
          { ar: "عصير موز", en: "Banana Juice", price: 3000 },
          { ar: "عصير بطيخ", en: "Watermelon Juice", price: 3000 },
          { ar: "عصير كيوي", en: "Kiwi Juice", price: 4000 },
          { ar: "عصير رمان", en: "Pomegranate Juice", price: 4000 },
          { ar: "عصير أناناس", en: "Pineapple Juice", price: 4000 },
          { ar: "عصير موز حليب", en: "Banana Milk", price: 4000 },
          { ar: "عصير موز نوتيلا", en: "Banana Nutella", price: 4000 },
          { ar: "عصير موز فراولة", en: "Banana Strawberry", price: 4000 },
          { ar: "عصير موز أناناس", en: "Banana Pineapple", price: 4000 },
          { ar: "ليمون نعناع", en: "Lemon Mint", price: 3000 },
          { ar: "ليمون برتقال", en: "Lemon Orange", price: 4000 },
          { ar: "كوكتيل فواكه", en: "Fruit Cocktail", price: 4000 },
        ],
      },
    ],
  },
  {
    id: "mojito",
    icon: "🍹",
    name: { ar: "الموهيتو", en: "Mojito" },
    groups: [
      {
        items: [
          { ar: "موهيتو ليمون", en: "Lemon Mojito", price: 3500 },
          { ar: "موهيتو ليمون تفاح", en: "Lemon Apple Mojito", price: 3500 },
          { ar: "موهيتو فراولة", en: "Strawberry Mojito", price: 3500 },
          { ar: "موهيتو رمان", en: "Pomegranate Mojito", price: 3500 },
          { ar: "موهيتو باشن فروت", en: "Passion Fruit Mojito", price: 3500 },
          { ar: "موهيتو خوخ", en: "Peach Mojito", price: 3500 },
          { ar: "موهيتو عنب", en: "Grape Mojito", price: 3500 },
          { ar: "موهيتو كراميل", en: "Caramel Mojito", price: 3500 },
          { ar: "موهيتو فانيلا", en: "Vanilla Mojito", price: 3500 },
          { ar: "موهيتو كرز", en: "Cherry Mojito", price: 3500 },
          { ar: "موهيتو امباير", en: "Empire Mojito", price: 4500 },
        ],
      },
    ],
  },
  {
    id: "smoothie",
    icon: "🍓",
    name: { ar: "السموذي", en: "Smoothies" },
    groups: [
      {
        items: [
          { ar: "سموذي فراولة", en: "Strawberry Smoothie", price: 4000 },
          { ar: "سموذي بلوبيري", en: "Blueberry Smoothie", price: 4000 },
          { ar: "سموذي باشن فروت", en: "Passion Fruit Smoothie", price: 4000 },
          { ar: "سموذي أناناس", en: "Pineapple Smoothie", price: 4000 },
          { ar: "سموذي توت", en: "Berry Smoothie", price: 4000 },
          { ar: "سموذي ريد بيري", en: "Red Berry Smoothie", price: 4000 },
          { ar: "سموذي كيوي", en: "Kiwi Smoothie", price: 4000 },
          { ar: "سموذي رمان", en: "Pomegranate Smoothie", price: 4000 },
        ],
      },
    ],
  },
  {
    id: "milkshake",
    icon: "🥤",
    name: { ar: "ميلك شيك", en: "Milkshakes" },
    groups: [
      {
        items: [
          { ar: "ميلك شيك نوتيلا", en: "Nutella Milkshake", price: 4500 },
          { ar: "ميلك شيك أوريو", en: "Oreo Milkshake", price: 4500 },
          { ar: "ميلك شيك لوتس", en: "Lotus Milkshake", price: 4500 },
          { ar: "ميلك شيك كندر", en: "Kinder Milkshake", price: 4500 },
          { ar: "ميلك شيك بستاشيو", en: "Pistachio Milkshake", price: 4500 },
          { ar: "ميلك شيك فانيلا", en: "Vanilla Milkshake", price: 4500 },
          { ar: "ميلك شيك كراميل", en: "Caramel Milkshake", price: 4500 },
          { ar: "ميلك شيك سبيشل", en: "Special Milkshake", price: 5000 },
        ],
      },
    ],
  },
  {
    id: "energy",
    icon: "⚡",
    name: { ar: "مشروبات الطاقة", en: "Energy Drinks" },
    groups: [
      {
        items: [
          { ar: "مكسيكي تايكر", en: "Mexican Tiger", price: 3000 },
          { ar: "مكسيكي امباير", en: "Mexican Empire", price: 4000 },
          { ar: "مكسيكي ريد بول", en: "Mexican Red Bull", price: 4000 },
          { ar: "ريد بول فراولة", en: "Red Bull Strawberry", price: 4000 },
          { ar: "ريد بول أناناس", en: "Red Bull Pineapple", price: 4000 },
          { ar: "ريد بول خوخ", en: "Red Bull Peach", price: 4000 },
          { ar: "ريد بول ليمون", en: "Red Bull Lemon", price: 4000 },
          { ar: "ريد بول باشن فروت", en: "Red Bull Passion Fruit", price: 4000 },
          { ar: "ريد بول تفاح", en: "Red Bull Apple", price: 4000 },
          { ar: "ريد بول", en: "Red Bull", price: 3000 },
          { ar: "تايكر", en: "Tiger", price: 1500 },
        ],
      },
    ],
  },
  {
    id: "crepe",
    icon: "🥞",
    name: { ar: "الكريب", en: "Crêpes" },
    groups: [
      {
        items: [
          { ar: "كريب كلاسيك", en: "Classic Crêpe", price: 3500 },
          { ar: "فوتوشيني كريب", en: "Fettuccine Crêpe", price: 4000 },
          { ar: "كريب مكسرات", en: "Nuts Crêpe", price: 5000 },
          { ar: "كريب لوتس", en: "Lotus Crêpe", price: 5000 },
          { ar: "كريب أوريو", en: "Oreo Crêpe", price: 5000 },
          { ar: "كريب بستاشيو", en: "Pistachio Crêpe", price: 5000 },
          { ar: "كريب كندر", en: "Kinder Crêpe", price: 5000 },
          { ar: "كريب فواكه", en: "Fruit Crêpe", price: 5000 },
          { ar: "كريب سبيشل", en: "Special Crêpe", price: 5000 },
          { ar: "سوشي كريب", en: "Sushi Crêpe", price: 5000 },
          { ar: "بقجة كريب", en: "Crêpe Bundle", price: 7000 },
        ],
      },
    ],
  },
  {
    id: "snacks",
    icon: "🍿",
    name: { ar: "السناكات", en: "Snacks" },
    groups: [
      {
        items: [
          { ar: "صحن فواكه", en: "Fruit Plate", price: 4000 },
          { ar: "كيك براونيز", en: "Brownies Cake", price: 4000 },
          { ar: "صحن كرزات", en: "Mixed Nuts Plate", price: 3000 },
          { ar: "قطعة كيك", en: "Cake Slice", price: 2000 },
          { ar: "شامية", en: "Popcorn", price: 2000 },
          { ar: "الجبس", en: "Chips", price: 1000 },
          { ar: "اندومي", en: "Indomie", price: 1000 },
        ],
      },
    ],
  },
  {
    id: "hot-drinks",
    icon: "☕",
    name: { ar: "المشروبات الساخنة", en: "Hot Drinks" },
    groups: [
      {
        name: { ar: "القهوة الساخنة", en: "Hot Coffee" },
        icon: "☕",
        items: [
          { ar: "اسبريسو سنكل", en: "Single Espresso", price: 2500 },
          { ar: "اسبريسو دبل", en: "Double Espresso", price: 4000 },
          { ar: "قهوة حلوة", en: "Sweet Coffee", price: 2500 },
          { ar: "قهوة وسط", en: "Medium Sweet Coffee", price: 2500 },
          { ar: "قهوة مرة", en: "Bitter Coffee", price: 2500 },
          { ar: "هوت جوكليت", en: "Hot Chocolate", price: 3000 },
          { ar: "هوت بستاشيو", en: "Hot Pistachio", price: 3000 },
          { ar: "هوت لوتس", en: "Hot Lotus", price: 3000 },
          { ar: "قهوة تركية", en: "Turkish Coffee", price: 3000 },
          { ar: "كبتشينو", en: "Cappuccino", price: 3000 },
          { ar: "نسكافيه", en: "Nescafé", price: 3000 },
          { ar: "حليب / حليب ككو", en: "Milk / Cocoa Milk", price: 1500 },
        ],
      },
      {
        name: { ar: "الشاي الساخن", en: "Hot Tea" },
        icon: "🍵",
        items: [
          { ar: "شاي عراقي", en: "Iraqi Tea", price: 1000 },
          { ar: "شاي ليمون", en: "Lemon Tea", price: 1500 },
          { ar: "شاي كرك", en: "Karak Tea", price: 1500 },
          { ar: "شاي رمان", en: "Pomegranate Tea", price: 1500 },
          { ar: "شاي توت أزرق", en: "Blueberry Tea", price: 1500 },
          { ar: "شاي توت أحمر", en: "Red Berry Tea", price: 1500 },
          { ar: "شاي ورد", en: "Rose Tea", price: 1500 },
          { ar: "جاي حليب", en: "Milk Tea", price: 1500 },
        ],
      },
    ],
  },
  {
    id: "cold-drinks",
    icon: "🧊",
    name: { ar: "المشروبات الباردة", en: "Cold Drinks" },
    groups: [
      {
        name: { ar: "القهوة الباردة", en: "Iced Coffee" },
        icon: "🧋",
        items: [
          { ar: "ايس لاتيه", en: "Iced Latte", price: 3000 },
          { ar: "ايس امريكانو", en: "Iced Americano", price: 3000 },
          { ar: "ايس فانيلا لاتيه", en: "Iced Vanilla Latte", price: 4000 },
          { ar: "ايس موكا", en: "Iced Mocha", price: 4000 },
          { ar: "ايس كراميل لاتيه", en: "Iced Caramel Latte", price: 4000 },
          { ar: "ايس نوتيلا", en: "Iced Nutella", price: 4000 },
          { ar: "ايس بستاشيو", en: "Iced Pistachio", price: 5000 },
          { ar: "ايس كندر", en: "Iced Kinder", price: 5000 },
        ],
      },
      {
        name: { ar: "الشاي البارد", en: "Iced Tea" },
        icon: "🍹",
        items: [
          { ar: "ايس تي تفاح", en: "Apple Iced Tea", price: 1500 },
          { ar: "ايس تي خوخ", en: "Peach Iced Tea", price: 1500 },
          { ar: "ايس تي أناناس", en: "Pineapple Iced Tea", price: 1500 },
          { ar: "ايس تي بلوبيري", en: "Blueberry Iced Tea", price: 1500 },
        ],
      },
    ],
  },
  {
    id: "hookah",
    icon: "💨",
    type: "hookah",
    name: { ar: "الأراكيل", en: "Hookah" },
    groups: [
      {
        items: [
          { ar: "إنكليزي", en: "English", price: 5000 },
          { ar: "آيس كريم", en: "Ice Cream", price: 5000 },
          { ar: "فراولة", en: "Strawberry", price: 5000 },
          { ar: "هاري بوتر", en: "Harry Potter", price: 5000 },
          { ar: "بلاك وايت", en: "Black & White", price: 5000 },
          { ar: "فواكه استوائية", en: "Tropical Fruits", price: 5000 },
          { ar: "علج نعناع", en: "Mint Gum", price: 5000 },
          { ar: "ببسي", en: "Pepsi", price: 5000 },
          { ar: "امباير", en: "Empire", price: 5000 },
          { ar: "تفاحتين", en: "Double Apple", price: 3000, woodOnly: true },
          { ar: "نعناع", en: "Mint", price: 3000, woodOnly: true },
        ],
      },
    ],
  },
  {
    id: "west-burger",
    icon: "🍔",
    partner: true,
    name: { ar: "ويست برغر", en: "West Burger" },
    groups: [
      {
        name: { ar: "دجاج ويست", en: "West Chicken" },
        icon: "🍗",
        items: [
          { ar: "مايتي زنجر", en: "Mighty Zinger", price: 6500, meal: true },
          { ar: "مايتي زنجر مشروم", en: "Mighty Zinger Mushroom", price: 7000, meal: true },
          { ar: "مايتي زنجر (اكس لارج)", en: "Mighty Zinger (XL)", price: 8000, meal: true },
          { ar: "برغر دجاج (120 غم)", en: "Chicken Burger (120g)", price: 6000, meal: true },
          { ar: "مطافي زنجر", en: "Matafi Zinger", price: 6500, meal: true },
          { ar: "ساندويش زنكر ويست", en: "West Zinger Sandwich", price: 7500, meal: true },
          { ar: "ساندويش دجاج توستر", en: "Chicken Toaster Sandwich", price: 6500, meal: true },
          { ar: "وجبة ستربس (3 قطع)", en: "Strips Meal (3 pcs)", price: 7000 },
          { ar: "وجبة ستربس (5 قطع)", en: "Strips Meal (5 pcs)", price: 10000 },
          { ar: "سيزر سلاد دجاج", en: "Chicken Caesar Salad", price: 6000 },
          { ar: "جكن فرايز", en: "Chicken Fries", price: 6500 },
          { ar: "ميني جكن فرايز", en: "Mini Chicken Fries", price: 4500 },
        ],
      },
      {
        name: { ar: "ريزو ويست", en: "West Rizo" },
        icon: "🍚",
        items: [
          { ar: "ريزو صلصة ويست", en: "West Sauce Rizo", price: 6500 },
          { ar: "ريزو سبيشل", en: "Special Rizo", price: 7000 },
          { ar: "ريزو جبن مدخن", en: "Smoked Cheese Rizo", price: 6500 },
          { ar: "ريزو سبايسي", en: "Spicy Rizo", price: 6500 },
          { ar: "ريزو أعشاب", en: "Herbs Rizo", price: 6500 },
          { ar: "ميني ريزو", en: "Mini Rizo", price: 4500 },
        ],
      },
      {
        name: { ar: "لحم ويست", en: "West Fresh Meat" },
        icon: "🥩",
        items: [
          { ar: "كرانجي برغر", en: "Crunchy Burger", price: 7000, desc: { ar: "لحم 90 غم دبل تشيدر والبطاطا المقرمشة", en: "90g beef, double cheddar and crispy potato" }, meal: true },
          { ar: "جيزي برغر", en: "Cheesy Burger", price: 7000, meal: true },
          { ar: "كلاسك برغر", en: "Classic Burger", price: 6500, meal: true },
          { ar: "صاص برغر", en: "Sauce Burger", price: 6500, meal: true },
          { ar: "سبيشل ويست بالفطر", en: "West Special Mushroom", price: 7500, meal: true },
          { ar: "مكسيكو برغر", en: "Mexico Burger", price: 7000, meal: true },
          { ar: "مونستر برغر", en: "Monster Burger", price: 9500, meal: true },
          { ar: "برغر 1990", en: "1990 Burger", price: 6500, meal: true },
          { ar: "يوفو برغر", en: "UFO Burger", price: 10500, meal: true },
          { ar: "بك ويست ×2", en: "Big West ×2", price: 10500, meal: true },
          { ar: "تربل تكساس ×3", en: "Triple Texas ×3", price: 12000, meal: true },
          { ar: "هوت دوغ جامبو ×2", en: "Jumbo Hot Dog ×2", price: 6000, meal: true },
        ],
      },
      {
        name: { ar: "بيتزا ويست", en: "West Pizza" },
        icon: "🍕",
        items: [
          { ar: "بيتزا لحم", en: "Beef Pizza", sizes: [{ size: "small", price: 8000 }, { size: "large", price: 15000 }] },
          { ar: "بيتزا دجاج", en: "Chicken Pizza", sizes: [{ size: "small", price: 8000 }, { size: "large", price: 13000 }] },
          { ar: "بيتزا ببروني", en: "Pepperoni Pizza", sizes: [{ size: "small", price: 7000 }, { size: "large", price: 14000 }] },
          { ar: "بيتزا مارغريتا", en: "Margherita Pizza", sizes: [{ size: "small", price: 7000 }, { size: "large", price: 14000 }] },
          { ar: "بيتزا خضار", en: "Veggie Pizza", sizes: [{ size: "small", price: 7000 }, { size: "large", price: 12000 }] },
          { ar: "بيتزا دجاج مشوي", en: "Grilled Chicken Pizza", sizes: [{ size: "small", price: 8000 }, { size: "large", price: 13000 }] },
        ],
      },
      {
        name: { ar: "المقبلات والفنكر", en: "Sides & Fries" },
        icon: "🍟",
        items: [
          { ar: "تاهو فنكر (لحم + جبن)", en: "Tahoe Fries (Beef + Cheese)", price: 6000 },
          { ar: "أجنحة (6 قطع)", en: "Wings (6 pcs)", price: 5500 },
          { ar: "حلقات البصل", en: "Onion Rings", price: 3000 },
          { ar: "ويست فنكر", en: "West Fries", price: 3000 },
          { ar: "ويست فنكر بالجبن", en: "West Cheese Fries", price: 3000 },
          { ar: "قدح فنكر", en: "Fries Cup", price: 1500 },
        ],
      },
      {
        name: { ar: "الصوصات", en: "Sauces" },
        icon: "🥫",
        items: [
          { ar: "صوص اورجنال", en: "Original Sauce", price: 1000 },
          { ar: "صوص اعشاب", en: "Herbs Sauce", price: 1000 },
          { ar: "صوص ثومية", en: "Garlic Sauce", price: 1000 },
          { ar: "صوص باربيكيو", en: "BBQ Sauce", price: 1000 },
        ],
      },
      {
        name: { ar: "المشروبات", en: "Drinks" },
        icon: "🥤",
        items: [
          { ar: "ماء", en: "Water", price: 500 },
          { ar: "بيبسي", en: "Pepsi", price: 750 },
          { ar: "بيبسي فريش", en: "Fresh Pepsi", price: 1000 },
        ],
      },
    ],
  },
];
