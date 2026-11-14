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
 *   meal      true = can be turned into a meal (+ CONFIG.meal.extra)
 *   woodOnly  hookah only: available as wooden hookah only
 */

export const SIZES = {
  medium: { ar: "وسط", en: "Medium" },
  family: { ar: "عائلي", en: "Family" },
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
          { ar: "موهيتو أمباير", en: "Empire Mojito", price: 4500 },
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
          { ar: "مكسيكي تايغر", en: "Mexican Tiger", price: 3000 },
          { ar: "مكسيكي امباير", en: "Mexican Empire", price: 4000 },
          { ar: "مكسيكي ريد بول", en: "Mexican Red Bull", price: 4000 },
          { ar: "ريد بول فراولة", en: "Red Bull Strawberry", price: 4000 },
          { ar: "ريد بول أناناس", en: "Red Bull Pineapple", price: 4000 },
          { ar: "ريد بول خوخ", en: "Red Bull Peach", price: 4000 },
          { ar: "ريد بول ليمون", en: "Red Bull Lemon", price: 4000 },
          { ar: "ريد بول باشن فروت", en: "Red Bull Passion Fruit", price: 4000 },
          { ar: "ريد بول تفاح", en: "Red Bull Apple", price: 4000 },
          { ar: "ريد بول", en: "Red Bull", price: 3000 },
          { ar: "تايغر", en: "Tiger", price: 1500 },
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
    id: "coffee",
    icon: "☕",
    name: { ar: "القهوة", en: "Coffee" },
    groups: [
      {
        name: { ar: "المشروبات الساخنة", en: "Hot Drinks" },
        icon: "🔥",
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
          { ar: "جاي حليب", en: "Milk Tea", price: 1500 },
        ],
      },
      {
        name: { ar: "القهوة الباردة", en: "Iced Coffee" },
        icon: "🧊",
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
    ],
  },
  {
    id: "tea",
    icon: "🍵",
    name: { ar: "الشاي", en: "Tea" },
    groups: [
      {
        name: { ar: "الشاي الحار", en: "Hot Tea" },
        icon: "🔥",
        items: [
          { ar: "شاي عراقي", en: "Iraqi Tea", price: 1000 },
          { ar: "شاي ليمون", en: "Lemon Tea", price: 1500 },
          { ar: "شاي كرك", en: "Karak Tea", price: 1500 },
          { ar: "شاي رمان", en: "Pomegranate Tea", price: 1500 },
          { ar: "شاي توت أزرق", en: "Blueberry Tea", price: 1500 },
          { ar: "شاي توت أحمر", en: "Red Berry Tea", price: 1500 },
          { ar: "شاي ورد", en: "Rose Tea", price: 1500 },
        ],
      },
      {
        name: { ar: "الشاي البارد", en: "Iced Tea" },
        icon: "🧊",
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
          { ar: "إمباير", en: "Empire", price: 5000 },
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
        name: { ar: "الدجاج", en: "Chicken" },
        icon: "🍗",
        items: [
          { ar: "مايتي زنجر (إكس لارج)", en: "Mighty Zinger (XL)", price: 7500, meal: true },
          { ar: "مايتي زنجر", en: "Mighty Zinger", price: 5500, meal: true },
          { ar: "مايتي لحم مشروم", en: "Mighty Beef Mushroom", price: 6500, meal: true },
          { ar: "برغر دجاج (120 غم)", en: "Chicken Burger (120g)", price: 5000, meal: true },
          { ar: "مطافي زنجر", en: "Matafi Zinger", price: 5500, meal: true },
          { ar: "سندويج توستر", en: "Toaster Sandwich", price: 5500, meal: true },
          { ar: "مونستر بيتزا دجاج", en: "Monster Chicken Pizza", price: 12000, meal: false },
          { ar: "وجبة ستربس (4 قطع)", en: "Strips Meal (4 pcs)", price: 9000, meal: false },
          { ar: "ريزو جامبو", en: "Jumbo Rizo", price: 6000, meal: false },
          { ar: "ريزو صلصة ويست", en: "West Sauce Rizo", price: 5500, meal: false },
          { ar: "ريزو جبن مدخن", en: "Smoked Cheese Rizo", price: 5500, meal: false },
          { ar: "ريزو أعشاب", en: "Herbs Rizo", price: 5500, meal: false },
          { ar: "ميني ريزو", en: "Mini Rizo", price: 4000, meal: false },
          { ar: "سيزر سلاد", en: "Caesar Salad", price: 5000, meal: false },
          { ar: "جكن فرايز", en: "Chicken Fries", price: 5500, meal: false },
          { ar: "وجبة الأطفال", en: "Kids Meal", price: 5000, meal: false },
        ],
      },
      {
        name: { ar: "اللحم", en: "Beef" },
        icon: "🥩",
        items: [
          { ar: "كرانجي برغر", en: "Crunchy Burger", price: 6500, meal: true },
          { ar: "جامبو برغر", en: "Jumbo Burger", price: 6500, meal: true },
          { ar: "كلاسك برغر", en: "Classic Burger", price: 5500, meal: true },
          { ar: "مشروم برغر", en: "Mushroom Burger", price: 6000, meal: true },
          { ar: "مونستر بالمشروم", en: "Monster Mushroom", price: 7000, meal: true },
          { ar: "مونستر برغر", en: "Monster Burger", price: 8500, meal: true },
          { ar: "بك ويست ×2", en: "Big West ×2", price: 9500, meal: true },
          { ar: "تربل كلاسك ×3", en: "Triple Classic ×3", price: 10500, meal: true },
          { ar: "يوفو برغر", en: "UFO Burger", price: 10000, meal: true },
          { ar: "برغر 1990", en: "1990 Burger", price: 6000, meal: true },
          { ar: "حار برغر", en: "Spicy Burger", price: 5500, meal: true },
          { ar: "هوت دوغ جامبو ×2", en: "Jumbo Hot Dog ×2", price: 5000, meal: true },
          { ar: "ويست فنكر", en: "West Fries", price: 3000, meal: false },
          { ar: "تاهو فنكر", en: "Tahoe Fries", price: 5000, meal: false },
          { ar: "وجبة الأطفال", en: "Kids Meal", price: 5000, meal: false },
        ],
      },
      {
        name: { ar: "البيتزا", en: "Pizza" },
        icon: "🍕",
        items: [
          { ar: "بيتزا مونستر لحم", en: "Monster Beef Pizza", sizes: [{ size: "medium", price: 7000 }, { size: "family", price: 14000 }] },
          { ar: "بيتزا أجبان مكس", en: "Mixed Cheese Pizza", sizes: [{ size: "medium", price: 7000 }, { size: "family", price: 14000 }] },
          { ar: "بيتزا دجاج متبل", en: "Spiced Chicken Pizza", sizes: [{ size: "medium", price: 7000 }, { size: "family", price: 12000 }] },
          { ar: "بيتزا بيبروني", en: "Pepperoni Pizza", sizes: [{ size: "medium", price: 7000 }, { size: "family", price: 14000 }] },
          { ar: "بيتزا مارغريتا", en: "Margherita Pizza", sizes: [{ size: "medium", price: 7000 }, { size: "family", price: 14000 }] },
          { ar: "بيتزا خضار", en: "Veggie Pizza", sizes: [{ size: "medium", price: 7000 }, { size: "family", price: 12000 }] },
        ],
      },
    ],
  },
];
