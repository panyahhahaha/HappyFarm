// Happy Farm - Questions & Lessons Database (Latest MoE Curriculum)
// Kindergarten (level-kg) to Grade 6 (level-p6)

window.questionsData = {
  "level-kg": {
    name: "Kindergarten (อนุบาล / อ.1 - อ.3)",
    math: [
      { id: "kg_m1", type: "count", question: "How many butterflies? (มีผีเสื้อทั้งหมดกี่ตัว?)", visual: "🦋🦋🦋", options: ["2", "3", "4"], answer: "3", explanation: "นับทีละตัวไปด้วยกันนะครับ: 🦋(หนึ่ง) ➔ 🦋(สอง) ➔ 🦋(สาม) รวมมีผีเสื้อ 3 ตัวครับ!" },
      { id: "kg_m2", type: "count", question: "How many apples? (มีแอปเปิ้ลกี่ผล?)", visual: "🍎🍎🍎🍎🍎", options: ["4", "5", "6"], answer: "5", explanation: "ใช้นิ้วนับทีละผล: 🍎(หนึ่ง) ➔ 🍎(สอง) ➔ 🍎(สาม) ➔ 🍎(สี่) ➔ 🍎(ห้า) รวมมีแอปเปิ้ล 5 ผลครับ!" },
      { id: "kg_m3", type: "shape", question: "Which shape is a circle? (รูปทรงใดคือวงกลม?)", visual: "🟡", options: ["Circle (วงกลม)", "Square (สี่เหลี่ยม)", "Triangle (สามเหลี่ยม)"], answer: "Circle (วงกลม)", explanation: "วงกลม (Circle) มีลักษณะโค้งมนกลมเกลี้ยง ไม่มีเหลี่ยมไม่มีมุม เหมือนรูป 🟡 ครับ!" },
      { id: "kg_m4", type: "shape", question: "Which shape is a triangle? (รูปทรงใดคือสามเหลี่ยม?)", visual: "🔺", options: ["Circle (วงกลม)", "Square (สี่เหลี่ยม)", "Triangle (สามเหลี่ยม)"], answer: "Triangle (สามเหลี่ยม)", explanation: "สามเหลี่ยม (Triangle) มี 3 มุมและมี 3 ด้านแหลมๆ ชี้ขึ้นด้านบน เหมือนรูป 🔺 ครับ!" },
      { id: "kg_m5", type: "shape", question: "Which shape is a square? (รูปทรงใดคือสี่เหลี่ยม?)", visual: "🟦", options: ["Circle (วงกลม)", "Square (สี่เหลี่ยม)", "Triangle (สามเหลี่ยม)"], answer: "Square (สี่เหลี่ยม)", explanation: "สี่เหลี่ยม (Square) มี 4 มุมและมี 4 ด้านเท่ากัน เหมือนรูปกล่อง 🟦 ครับ!" },
      { id: "kg_m6", type: "comparison", question: "Which fruit is BIG? (ผลไม้ใดมีขนาดใหญ่?)", visual: "🍉 vs 🍓", options: ["Watermelon (แตงโม)", "Strawberry (สตรอว์เบอร์รี่)"], answer: "Watermelon (แตงโม)", explanation: "แตงโม 🍉 ผลใหญ่มาก (BIG) ส่วนสตรอว์เบอร์รี่ 🍓 มีขนาดเล็กจิ๋ว (Small) ครับ!" },
      { id: "kg_m7", type: "comparison", question: "Which animal is TALL? (สัตว์ตัวใดมีความสูง?)", visual: "🦒 vs 🐱", options: ["Giraffe (ยีราฟ)", "Cat (แมว)"], answer: "Giraffe (ยีราฟ)", explanation: "ยีราฟ 🦒 คอยาวสูงชะลูดขึ้นฟ้า (TALL) ส่วนแมว 🐱 ตัวเตี้ยอยู่ใกล้พื้นดินครับ!" },
      { id: "kg_m8", type: "count", question: "How many carrots? (มีแครอทกี่หัว?)", visual: "🥕🥕", options: ["1", "2", "3"], answer: "2", explanation: "นับทีละหัวในแปลง: 🥕(หนึ่ง) ➔ 🥕(สอง) รวมมีแครอท 2 หัวครับ!" },
      { id: "kg_m9", type: "count", question: "How many ducks? (มีเป็ดกี่ตัว?)", visual: "🦆🦆🦆🦆", options: ["3", "4", "5"], answer: "4", explanation: "นับเป็ด in บ่อน้ำ: 🦆(หนึ่ง) ➔ 🦆(สอง) ➔ 🦆(สาม) ➔ 🦆(สี่) รวมมีเป็ด 4 ตัวครับ!" },
      { id: "kg_m10", type: "comparison", question: "Which string is LONG? (เชือกเส้นใดมีความยาว?)", visual: "      vs   ", options: ["Long (ยาว)", "Short (สั้น)"], answer: "Long (ยาว)", explanation: "เชือกที่มีหลายลูปมีความยาว (LONG) ส่วนเชือกสั้นมีขนาดย่อลงมาครับ!" }
    ],
    english: [
      { id: "kg_e1", type: "alphabet", question: "Which letter is CAPITAL letter A? (อักษรพิมพ์ใหญ่ A)", visual: "a vs A", options: ["a", "A", "B"], answer: "A", explanation: "อักษรตัวพิมพ์ใหญ่ของ a คือ A ตัวใหญ่ที่มียอดแหลมเหมือนหลังคาบ้านครับ!" },
      { id: "kg_e2", type: "alphabet", question: "Which letter is lowercase b? (อักษรพิมพ์เล็ก b)", visual: "B vs b", options: ["b", "d", "p"], answer: "b", explanation: "ตัวพิมพ์เล็กคือ b สังเกตมีเส้นตรงชี้ขึ้นบนและมีพุงป่องไปทางขวา (b) ครับ!" },
      { id: "kg_e3", type: "phonics", question: "What sound does the letter 'A' make? (ตัวอักษร A ออกเสียงอะไร?)", visual: "Letter A", options: ["แอะ (ae)", "เบอะ (be)", "เคอะ (ke)"], answer: "แอะ (ae)", explanation: "ในระบบโฟนิกส์ ตัวอักษร A ออกเสียงว่า 'แอะ' (ae) เช่น A-A-Apple (แอะ-แอะ-แอปเปิ้ล) ครับ!" },
      { id: "kg_e4", type: "phonics", question: "What sound does the letter 'B' make? (ตัวอักษร B ออกเสียงอะไร?)", visual: "Letter B", options: ["แอะ (ae)", "เบอะ (be)", "เดอะ (de)"], answer: "เบอะ (be)", explanation: "ในระบบโฟนิกส์ ตัวอักษร B ออกเสียงว่า 'เบอะ' (be) เช่น B-B-Boy (เบอะ-เบอะ-บอย) ครับ!" },
      { id: "kg_e5", type: "color", question: "What color is this apple? (แอปเปิ้ลสีนี้คือสีอะไร?)", visual: "🍎", options: ["Red (สีแดง)", "Blue (สีน้ำเงิน)", "Yellow (สีเหลือง)"], answer: "Red (สีแดง)", explanation: "แอปเปิ้ลผลนี้มีสีแดง ภาษาอังกฤษคือคำว่า Red (เรด) สะกดด้วย R-E-D ครับ!" },
      { id: "kg_e6", type: "color", question: "What color is this banana? (กล้วยหอมสีนี้คือสีอะไร?)", visual: "🍌", options: ["Red (สีแดง)", "Blue (สีน้ำเงิน)", "Yellow (สีเหลือง)"], answer: "Yellow (สีเหลือง)", explanation: "กล้วยสุกสีเหลืองสดใส ภาษาอังกฤษคือคำว่า Yellow (เยลโล่ว) สะกดด้วย Y-E-L-L-O-W ครับ!" },
      { id: "kg_e7", type: "vocabulary", question: "What animal is this? (สัตว์ตัวนี้คืออะไร?)", visual: "🐱", options: ["Cat (แมว)", "Dog (สุนัข)", "Pig (หมู)"], answer: "Cat (แมว)", explanation: "สัตว์เลี้ยงน่ารักร้องเหมียวๆ คือ แมว ภาษาอังกฤษพูดว่า Cat (แคท) สะกด C-A-T ครับ!" },
      { id: "kg_e8", type: "vocabulary", question: "What animal is this? (สัตว์ตัวนี้คืออะไร?)", visual: "🐶", options: ["Cat (แมว)", "Dog (สุนัข)", "Pig (หมู)"], answer: "Dog (สุนัข)", explanation: "สัตว์เลี้ยงสี่ขาเฝ้าบ้านคือ สุนัข ภาษาอังกฤษพูดว่า Dog (ด็อก) สะกด D-O-G ครับ!" },
      { id: "kg_e9", type: "alphabet", question: "Which letter is lowercase d? (อักษรพิมพ์เล็ก d)", visual: "D vs d", options: ["b", "d", "q"], answer: "d", explanation: "ตัวพิมพ์เล็กคือ d มีเส้นตรงขึ้นบนและก้นป่องไปทางซ้าย (d) จำสลับกับ b ดีๆ นะครับ!" },
      { id: "kg_e10", type: "phonics", question: "What sound does the letter 'C' make? (ตัวอักษร C ออกเสียงอะไร?)", visual: "Letter C", options: ["แอะ (ae)", "เบอะ (be)", "เคอะ (ke)"], answer: "เคอะ (ke)", explanation: "ในระบบโฟนิกส์ ตัวอักษร C ออกเสียงว่า 'เคอะ' (ke) เช่น C-C-Cat (เคอะ-เคอะ-แคท) ครับ!" }
    ]
  },
  "level-p1": {
    name: "Grade 1 (ประถมศึกษาปีที่ 1 / ป.1)",
    math: [
      { id: "p1_m1", type: "count", question: "Count the total carrots: (มีแครอทกี่หัว?)", visual: "🥕🥕🥕🥕🥕🥕", options: ["5", "6", "7"], answer: "6", explanation: "นับแครอทแถวตรง: 1, 2, 3, 4, 5, 6 ตอบ 6 หัวครับ!" },
      { id: "p1_m2", type: "addition", question: "Solve: 5 + 3 = ?", visual: "5 + 3", options: ["7", "8", "9"], answer: "8", explanation: "มีอยู่ 5 นับเพิ่มไปอีก 3 ขั้น: 6 ➔ 7 ➔ 8 คำตอบคือ 8 ครับ!" },
      { id: "p1_m3", type: "subtraction", question: "Solve: 9 - 4 = ?", visual: "9 - 4", options: ["4", "5", "6"], answer: "5", explanation: "มีอยู่ 9 หักออกไป 4 นิ้ว จะเหลือนิ้วที่ตั้งอยู่ 5 นิ้ว ตอบ 5 ครับ!" },
      { id: "p1_m4", type: "addition", question: "Solve: 12 + 6 = ?", visual: "12 + 6", options: ["16", "18", "20"], answer: "18", explanation: "เก็บ 12 ไว้ในใจ ชูขึ้นมา 6 นิ้ว นับต่อ: 13, 14, 15, 16, 17, 18 คำตอบคือ 18 ครับ!" },
      { id: "p1_m5", type: "subtraction", question: "Solve: 15 - 5 = ?", visual: "15 - 5", options: ["10", "11", "12"], answer: "10", explanation: "มีอยู่ 15 ลบหลักหน่วยออกไป 5 (5 - 5 = 0) คงเหลือเลขในหลักสิบคือ 10 ครับ!" },
      { id: "p1_m6", type: "comparison", question: "Which relationship is correct? (ความสัมพันธ์ใดถูกต้อง?)", visual: "25 and 18", options: ["25 > 18", "25 < 18", "25 = 18"], answer: "25 > 18", explanation: "25 มีสองสิบ ซึ่งมีค่ามากกว่า 18 ที่มีเพียงหนึ่งสิบ ดังนั้นเครื่องหมายที่ถูกต้องคือ มากกว่า (>) ครับ!" },
      { id: "p1_m7", type: "length", question: "Which is longer? (สิ่งใดมีความยาวมากกว่า?)", visual: "📏 vs ✏️", options: ["Ruler (ไม้บรรทัด)", "Pencil (ดินสอ)"], answer: "Ruler (ไม้บรรทัด)", explanation: "ไม้บรรทัด 📏 โดยทั่วไปมีความยาวประมาณ 30 ซม. ซึ่งยาวกว่าดินสอ ✏️ ครับ!" },
      { id: "p1_m8", type: "weight", question: "Which is heavier? (สิ่งใดมีน้ำหนักมากกว่า?)", visual: "🍉 vs 🍊", options: ["Watermelon (แตงโม)", "Orange (ส้ม)"], answer: "Watermelon (แตงโม)", explanation: "แตงโม 🍉 ผลใหญ่และหนาแน่นกว่าส้ม 🍊 จึงมีน้ำหนักมากกว่า (heavier) ครับ!" },
      { id: "p1_m9", type: "addition", question: "Solve: 20 + 30 = ?", visual: "20 + 30", options: ["40", "50", "60"], answer: "50", explanation: "บวกทีละสิบ: 2 สิบ บวกกับ 3 สิบ รวมเป็น 5 สิบ หรือ 50 ครับ!" },
      { id: "p1_m10", type: "subtraction", question: "Solve: 50 - 20 = ?", visual: "50 - 20", options: ["20", "30", "40"], answer: "30", explanation: "มีอยู่ 5 สิบ หักออกไป 2 สิบ จะเหลือ 3 สิบ หรือ 30 ครับ!" }
    ],
    english: [
      { id: "p1_e1", type: "spelling", question: "Complete the word: c _ t (แมว)", visual: "🐱", options: ["a", "e", "i"], answer: "a", explanation: "แมวสะกดว่า C-A-T ออกเสียง เคอะ-แอะ-เทอะ (แคท) ตัวอักษรที่หายไปคือ a ครับ!" },
      { id: "p1_e2", type: "spelling", question: "Complete the word: h _ n (แม่ไก่)", visual: "Hen (🐔)", options: ["a", "e", "u"], answer: "e", explanation: "แม่ไก่สะกดว่า H-E-N ออกเสียง เฮอะ-เอะ-เนอะ (เฮน) ตัวที่ขาดหายไปคือ e ครับ!" },
      { id: "p1_e3", type: "vocabulary", question: "What is this classroom object? (สิ่งนี้ในห้องเรียนคืออะไร?)", visual: "✏️", options: ["Book (หนังสือ)", "Pencil (ดินสอ)", "Ruler (ไม้บรรทัด)"], answer: "Pencil (ดินสอ)", explanation: "อุปกรณ์ที่ใช้เขียนและมียางลบคือ ดินสอ ภาษาอังกฤษสะกด P-E-N-C-I-L ครับ!" },
      { id: "p1_e4", type: "vocabulary", question: "What is this body part? (ส่วนนี้ของร่างกายคืออะไร?)", visual: "👁️", options: ["Ear (หู)", "Eye (ตา)", "Nose (จมูก)"], answer: "Eye (ตา)", explanation: "ดวงตาที่ใช้มองเห็นสิ่งต่าง ๆ ภาษาอังกฤษคือคำว่า Eye (อาย) สะกด E-Y-E ครับ!" },
      { id: "p1_e5", type: "greeting", question: "What do you say when you meet someone in the morning?", visual: "🌅 7:00 AM", options: ["Good morning", "Good afternoon", "Good night"], answer: "Good morning", explanation: "ช่วงเช้าหลังพระอาทิตย์ขึ้น เรากล่าวทักทายสุภาพว่า Good morning (สวัสดีตอนเช้า) ครับ!" },
      { id: "p1_e6", type: "greeting", question: "What do you say before you go to sleep?", visual: "🌙 9:00 PM", options: ["Hello", "Good morning", "Good night"], answer: "Good night", explanation: "ก่อนเข้านอนเพื่ออวยพรให้ฝันดี เรากล่าวร่ำลาว่า Good night (ราตรีสวัสดิ์) ครับ!" },
      { id: "p1_e7", type: "spelling", question: "Complete the word: p _ g (หมู)", visual: "🐷", options: ["a", "i", "o"], answer: "i", explanation: "หมูตัวน้อยสะกดว่า P-I-G ออกเสียง เพอะ-อิ-เกอะ (พิก) ตัวสระตรงกลางคือ i ครับ!" },
      { id: "p1_e8", type: "vocabulary", question: "What is this classroom object? (หนังสือ 📖)", visual: "📖", options: ["Book", "Pencil", "Desk"], answer: "Book", explanation: "หนังสือเล่มหนาภาษาอังกฤษคือ Book (บุ๊ก) สะกด B-O-O-K ครับ!" },
      { id: "p1_e9", type: "vocabulary", question: "What body part is used for hearing? (ส่วนใดใช้ฟัง?)", visual: "👂", options: ["Eye", "Nose", "Ear"], answer: "Ear", explanation: "อวัยวะหูที่ใช้ฟังเสียงต่าง ๆ ภาษาอังกฤษคือ Ear (เอียร์) สะกด E-A-R ครับ!" },
      { id: "p1_e10", type: "greeting", question: "What do you say when you part ways with friends?", visual: "👋 Leaving", options: ["Hello", "Goodbye", "Good morning"], answer: "Goodbye", explanation: "เมื่อโบกมือลาเพื่อนหลังจากโรงเรียนเลิก เราบอกลากันด้วยคำว่า Goodbye (ลาก่อน) ครับ!" }
    ]
  },
  "level-p2": {
    name: "Grade 2 (ประถมศึกษาปีที่ 2 / ป.2)",
    math: [
      { id: "p2_m1", type: "addition", question: "Solve: 145 + 32 = ?", visual: "145 + 32", options: ["175", "177", "187"], answer: "177", explanation: "บวกแยกหลัก: หลักหน่วย (5 + 2 = 7) หลักสิบ (4 + 3 = 7) หลักร้อยคงเดิม (1) ได้ผลลัพธ์เป็น 177 ครับ!" },
      { id: "p2_m2", type: "subtraction", question: "Solve: 256 - 134 = ?", visual: "256 - 134", options: ["122", "125", "132"], answer: "122", explanation: "ลบทีละหลักจากหน่วยไปร้อย: 6 - 4 = 2 (หน่วย), 5 - 3 = 2 (สิบ), 2 - 1 = 1 (ร้อย) รวมเป็น 122 ครับ!" },
      { id: "p2_m3", type: "addition_regroup", question: "Solve: 56 + 28 = ?", visual: "56 + 28", options: ["74", "84", "86"], answer: "84", explanation: "บวกหลักหน่วย: 6 + 8 = 14 ใส่ 4 ทด 1 ในหลักสิบ ➔ บวกหลักสิบ: 5 + 2 + ตัวทด 1 = 8 รวมเป็น 84 ครับ!" },
      { id: "p2_m4", type: "subtraction_regroup", question: "Solve: 82 - 45 = ?", visual: "82 - 45", options: ["37", "43", "47"], answer: "37", explanation: "หลักหน่วย 2 น้อยกว่า 5 ยืมหลักสิบมา 1 (เป็น 12) ➔ 12 - 5 = 7; หลักสิบถูกยืมเหลือ 7 ➔ 7 - 4 = 3 ตอบ 37 ครับ!" },
      { id: "p2_m5", type: "multiplication", question: "Solve: 2 x 7 = ?", visual: "2 x 7", options: ["12", "14", "16"], answer: "14", explanation: "สูตรคูณแม่สอง: 2 คูณ 7 ได้ 14 หรือเท่ากับการนำ 7 มาบวกกันสองรอบ (7 + 7) = 14 ครับ!" },
      { id: "p2_m6", type: "multiplication", question: "Solve: 5 x 6 = ?", visual: "5 x 6", options: ["25", "30", "35"], answer: "30", explanation: "สูตรคูณแม่ห้า: 5 คูณ 6 ได้ 30 หรือนับเพิ่มทีละห้าจำนวนหกหน: 5, 10, 15, 20, 25, 30 ครับ!" },
      { id: "p2_m7", type: "multiplication", question: "Solve: 3 x 8 = ?", visual: "3 x 8", options: ["24", "26", "28"], answer: "24", explanation: "สูตรคูณแม่สาม: 3 คูณ 8 ได้ 24 หรือนำแปดมาบวกสะสมสามรอบ (8 + 8 + 8) = 24 ครับ!" },
      { id: "p2_m8", type: "addition", question: "Solve: 300 + 450 = ?", visual: "300 + 450", options: ["700", "750", "800"], answer: "750", explanation: "บวกหลักร้อย: 300 + 400 = 700 แล้วบวกหลักสิบอีก 50 ได้รวมกันเป็น 750 ครับ!" },
      { id: "p2_m9", type: "subtraction", question: "Solve: 500 - 150 = ?", visual: "500 - 150", options: ["300", "350", "400"], answer: "350", explanation: "ตั้งลบปกติ: หักออกทีละร้อยก่อน ➔ 500 - 100 = 400 ลบออกอีกห้าสิบ ➔ 400 - 50 = 350 ครับ!" },
      { id: "p2_m10", type: "multiplication", question: "Solve: 10 x 9 = ?", visual: "10 x 9", options: ["80", "90", "100"], answer: "90", explanation: "อะไรก็ตามคูณด้วย 10 ให้เอาเลขนั้นแล้วต่อท้ายด้วยเลข 0 หนึ่งตัว ➔ 9 เติม 0 กลายเป็น 90 ครับ!" }
    ],
    english: [
      { id: "p2_e1", type: "plural", question: "What is the plural of 'hen'? (แม่ไก่หลายตัวสะกดยังไง?)", visual: "1 hen ➔ 3 ____", options: ["hen", "hens", "henes"], answer: "hens", explanation: "คำนามปกติเปลี่ยนเป็นพหูพจน์ (มีหลายตัว) ให้เติม s ท้ายคำได้ทันทีเป็น hens ครับ!" },
      { id: "p2_e2", type: "plural", question: "What is the plural of 'box'? (กล่องหลายกล่องสะกดยังไง?)", visual: "1 box ➔ 2 ____", options: ["boxs", "boxes", "boxesn"], answer: "boxes", explanation: "คำที่ลงท้ายด้วย x, s, ch, sh เมื่อเปลี่ยนเป็นพหูพจน์ จะต้องเติม -es กลายเป็น boxes ครับ!" },
      { id: "p2_e3", type: "pronoun", question: "Choose the correct pronoun: Farmer Joe is busy. ____ is working.", visual: "Farmer Joe (👨‍🌾)", options: ["He", "She", "It"], answer: "He", explanation: "คุณลุงชาวนาเป็นผู้ชาย สรรพนามแทนเขาผู้ชายเพียงคนเดียวคือ He (เขา) ครับ!" },
      { id: "p2_e4", type: "pronoun", question: "Choose the correct pronoun: Nong Mary is happy. ____ is playing.", visual: "Mary (👧)", options: ["He", "She", "It"], answer: "She", explanation: "น้องแมรี่เป็นเด็กผู้หญิง สรรพนามแทนเธอ/หล่อนเพียงคนเดียวคือ She (เธอ) ครับ!" },
      { id: "p2_e5", type: "preposition", question: "Where is the egg? The egg is ____ the nest.", visual: "🥚 in nest", options: ["in", "on", "under"], answer: "in", explanation: "ไข่ไค่วางอยู่ขอบล้อมรอบด้านในรัง คำระบุตำแหน่งแปลว่า 'ใน' คือ in ครับ!" },
      { id: "p2_e6", type: "preposition", question: "Where is the cat? The cat is sleeping ____ the chair.", visual: "🐱 under chair", options: ["in", "on", "under"], answer: "under", explanation: "แมวนอนขดตัวอยู่ด้านล่างเก้าอี้ คำระบุตำแหน่งแปลว่า 'ใต้' คือ under ครับ!" },
      { id: "p2_e7", type: "verb", question: "Choose the action verb: The horse can ____ very fast.", visual: "🐎", options: ["run (วิ่ง)", "fly (บิน)", "swim (ว่ายน้ำ)"], answer: "run (วิ่ง)", explanation: "ม้าเป็นสัตว์บกที่มีกำลัง สามารถวิ่งได้รวดเร็ว คำกริยาคือ run (วิ่ง) ครับ!" },
      { id: "p2_e8", type: "verb", question: "Choose the action verb: The duck can ____ in the pond.", visual: "🦆", options: ["run", "fly", "swim"], answer: "swim", explanation: "เป็ดมีตีนพังผืดลอยตัวอยู่ในน้ำได้ดี กริยาขยับเคลื่อนที่ในน้ำคือ swim (ว่ายน้ำ) ครับ!" },
      { id: "p2_e9", type: "preposition", question: "Where is the apple? The apple is ____ the table.", visual: "🍎 on table", options: ["in", "on", "under"], answer: "on", explanation: "แอปเปิ้ลวางสัมผัสผิวบนของหน้าโต๊ะ คำระบุตำแหน่งแปลว่า 'บน' คือ on ครับ!" },
      { id: "p2_e10", type: "pronoun", question: "Choose correct pronoun for the tractor: '____ is blue.'", visual: "🚜", options: ["He", "She", "It"], answer: "It", explanation: "รถแทรกเตอร์เป็นสิ่งของที่ไม่มีชีวิต สรรพนามเรียกสิ่งของชิ้นเดี่ยวคือ It (มัน) ครับ!" }
    ]
  },
  "level-p3": {
    name: "Grade 3 (ประถมศึกษาปีที่ 3 / ป.3)",
    math: [
      { id: "p3_m1", type: "division", question: "Solve: 24 / 4 = ?", visual: "24 / 4", options: ["5", "6", "7"], answer: "6", explanation: "คิดย้อนกลับการคูณ: เลขอะไรคูณด้วย 4 แล้วได้ 24? ➔ 4 x 6 = 24 ดังนั้นคำตอบคือ 6 ครับ!" },
      { id: "p3_m2", type: "division_remainder", question: "Solve: 17 / 5 = ?", visual: "17 / 5", options: ["3 remainder 2", "3 remainder 1", "4 remainder 1"], answer: "3 remainder 2", explanation: "5 คูณ 3 ได้ 15 ➔ 17 หักออก 15 เหลือเศษ 2 สรุปได้ผลลัพธ์เป็น 3 เศษ 2 ครับ!" },
      { id: "p3_m3", type: "fraction", question: "What fraction of the pizza is remaining? (พิซซ่าเหลือเศษส่วนเท่าใด?)", visual: "🍕 3 left of 4 total", options: ["1/4", "3/4", "3/8"], answer: "3/4", explanation: "มีทั้งหมด 4 ส่วนเท่าๆ กัน เหลืออยู่ 3 ส่วน เขียนเป็นเศษส่วนได้ เศษ 3 ส่วน 4 หรือ 3/4 ครับ!" },
      { id: "p3_m4", type: "clock", question: "If the short hand points to 4 and the long hand points to 12, what time is it?", visual: "🕓", options: ["4:00", "12:00", "4:30"], answer: "4:00", explanation: "เข็มยาวชี้เลข 12 คือการบอกเวลาชั่วโมงเต็มพอดี (0 นาที) เข็มสั้นชี้เลข 4 แปลว่าเวลาคือ 4:00 ครับ!" },
      { id: "p3_m5", type: "clock_half", question: "If the short hand is between 8 and 9, and the long hand points to 6, what time is it?", visual: "🕗-🕘 long hand on 6", options: ["8:00", "8:30", "9:30"], answer: "8:30", explanation: "เข็มยาวชี้เลข 6 บ่งบอกเวลาผ่านไปครึ่งชั่วโมง (30 นาที) เข็มสั้นเลยเลข 8 มาครึ่งทางจึงเป็นเวลา 8:30 ครับ!" },
      { id: "p3_m6", type: "addition", question: "Solve: 1,250 + 450 = ?", visual: "1250 + 450", options: ["1,650", "1,700", "1,750"], answer: "1,700", explanation: "บวกตามหลัก: 50 + 50 = 100 ใส่ 0 ทด 1 ➔ 200 + 400 + ตัวทด 100 = 700 ➔ 1,000 + 700 = 1,700 ครับ!" },
      { id: "p3_m7", type: "subtraction", question: "Solve: 4,500 - 1,200 = ?", visual: "4500 - 1200", options: ["3,200", "3,300", "3,500"], answer: "3,300", explanation: "ลบหลักร้อย: 500 - 200 = 300 ลบหลักพัน: 4,000 - 1,000 = 3,000 รวมเป็น 3,300 ครับ!" },
      { id: "p3_m8", type: "fraction_compare", question: "Which fraction is bigger? (เศษส่วนใดมีค่ามากกว่า?)", visual: "1/2 vs 1/4", options: ["1/2", "1/4", "Equal (=)"], answer: "1/2", explanation: "1/2 คือการแบ่งของออกเป็น 2 ส่วนแล้วหยิบมา 1 ส่วน ซึ่งได้ชิ้นใหญ่กว่าการแบ่ง 4 ส่วน (1/4) ครับ!" },
      { id: "p3_m9", type: "clock", question: "How many minutes are in 2 hours? (ในเวลา 2 ชั่วโมง มีกี่นาที?)", options: ["60 minutes", "100 minutes", "120 minutes"], answer: "120 minutes", explanation: "กฎคือ 1 ชั่วโมงมี 60 นาที ดังนั้น 2 ชั่วโมงนำมาคูณกัน ➔ 60 x 2 = 120 นาทีครับ!" },
      { id: "p3_m10", type: "money", question: "You buy seeds for 25 coins. You pay with 50 coins. What is your change?", visual: "50 - 25 = ?", options: ["15 coins", "25 coins", "30 coins"], answer: "25 coins", explanation: "คิดทอนเงินด้วยการลบราคาออก: 50 - 25 = 25 เหรียญทองทอนครับ!" }
    ],
    english: [
      { id: "p3_e1", type: "grammar", question: "Choose correct form: Farmer Joe ______ apples.", visual: "Farmer Joe (Singular)", options: ["like", "likes", "liking"], answer: "likes", explanation: "ประธานเอกพจน์คนเดียว (Farmer Joe) ใน Present Simple กริยาแสดงความชอบต้องเติม s ➔ likes ครับ!" },
      { id: "p3_e2", type: "grammar", question: "Choose correct form: We ______ carrots every day.", visual: "We (Plural)", options: ["eat", "eats", "eating"], answer: "eat", explanation: "ประธานพหูพจน์หลายคน (We) กริยาไม่ต้องเติม s ท้ายคำในช่องปัจจุบัน ➔ eat ครับ!" },
      { id: "p3_e3", type: "question", question: "Complete the sentence: ______ is the tractor? It is near the barn.", visual: "Tractor near barn", options: ["Who", "What", "Where"], answer: "Where", explanation: "คำตอบระบุสถานที่ ('near the barn') คำขึ้นต้นคำถามที่ถามหาพิกัดสถานที่คือ Where (ที่ไหน) ครับ!" },
      { id: "p3_e4", type: "question", question: "Complete the sentence: ______ is this? This is a carrot seed.", visual: "Seed packet", options: ["Who", "What", "When"], answer: "What", explanation: "คำตอบระบุชนิดสิ่งของ ('carrot seed') คำขึ้นต้นคำถามชี้ถามสิ่งของคือ What (อะไร) ครับ!" },
      { id: "p3_e5", type: "possessive", question: "Complete the sentence: This is Mary's pig. It is ______ pig.", visual: "Mary (👧)", options: ["his", "her", "my"], answer: "her", explanation: "น้องแมรี่เป็นผู้หญิง คำแสดงความเป็นเจ้าของของผู้หญิงคนเดียวคือ her (ของเธอ) ➔ her pig ครับ!" },
      { id: "p3_e6", type: "possessive", question: "Complete the sentence: This is Joe's tractor. It is ______ tractor.", visual: "Joe (👦)", options: ["his", "her", "our"], answer: "his", explanation: "โจเป็นผู้ชาย คำสรรพนามแสดงความเป็นเจ้าของของผู้ชายคนเดียวคือ his (ของเขา) ➔ his tractor ครับ!" },
      { id: "p3_e7", type: "grammar", question: "Choose correct verb to be: The cows ______ grazing in the field.", visual: "cows (Plural)", options: ["is", "am", "are"], answer: "are", explanation: "วัวหลายตัว (cows) เป็นพหูพจน์ ต้องคู่กับ Verb to be พหูพจน์คือ are ครับ!" },
      { id: "p3_e8", type: "question", question: "Complete the sentence: ______ feeds the chickens? Farmer Bob does.", visual: "Farmer Bob (Person)", options: ["Who", "What", "Where"], answer: "Who", explanation: "คำตอบระบุชื่อบุคคล ('Farmer Bob') คำเชื่อมขึ้นต้นถามถึงตัวบุคคลคือ Who (ใคร) ครับ!" },
      { id: "p3_e9", type: "vocabulary", question: "What is 7:30 in English word numbers?", visual: "7:30", options: ["Seven thirty", "Seven thirteen", "Eight thirty"], answer: "Seven thirty", explanation: "ชั่วโมงคือเจ็ด (Seven) นาทีคือสามสิบ (thirty) อ่านเรียงต่อกันเป็น Seven thirty ครับ!" },
      { id: "p3_e10", type: "possessive", question: "Complete the sentence: We live on this farm. It is ______ farm.", visual: "We", options: ["my", "your", "our"], answer: "our", explanation: "พวกเรา (We) อาศัยอยู่ที่นี่ สรรพนามชี้ความเป็นเจ้าของร่วมของพวกเราคือ our (ของพวกเรา) ครับ!" }
    ]
  },
  "level-p4": {
    name: "Grade 4 (ประถมศึกษาปีที่ 4 / ป.4)",
    math: [
      { id: "p4_m1", type: "decimal", question: "What decimal is represented by 3/10? (แปลง 3/10 เป็นทศนิยม)", visual: "3/10", options: ["0.3", "0.03", "3.0"], answer: "0.3", explanation: "ตัวหารเป็น 10 คือทศนิยม 1 ตำแหน่ง นำ 3 มาจุดข้างหน้าหนึ่งหลัก ➔ 0.3 ครับ!" },
      { id: "p4_m2", type: "fraction_add", question: "Solve: 2/5 + 1/5 = ?", visual: "2/5 + 1/5", options: ["3/10", "3/5", "4/5"], answer: "3/5", explanation: "ตัวส่วนด้านล่างเป็น 5 เท่ากันอยู่แล้ว สามารถนำเศษตัวบนมาบวกกันตรงๆ: 2 + 1 = 3 ได้เป็น 3/5 ครับ!" },
      { id: "p4_m3", type: "fraction_sub", question: "Solve: 7/8 - 3/8 = ?", visual: "7/8 - 3/8", options: ["4/16", "4/8", "5/8"], answer: "4/8", explanation: "ตัวส่วนด้านล่างคงเดิมคือ 8 นำเศษด้านบนลบกันตรงตัว: 7 - 3 = 4 ได้ผลลัพธ์คือ 4/8 ครับ!" },
      { id: "p4_m4", type: "elapsed_time", question: "A tractor left at 8:00 AM and arrived at 10:30 AM. How long did the trip take?", visual: "8:00 AM ➔ 10:30 AM", options: ["2 hours", "2 hours 30 mins", "3 hours"], answer: "2 hours 30 mins", explanation: "คิดระยะเวลา: จาก 8:00 ถึง 10:00 คือ 2 ชั่วโมง และเดินหน้าต่ออีก 30 นาที สรุปรวมเป็น 2 ชั่วโมง 30 นาทีครับ!" },
      { id: "p4_m5", type: "multiplication", question: "Solve: 12 x 15 = ?", visual: "12 x 15", options: ["160", "180", "200"], answer: "180", explanation: "ตั้งคูณ: 12 x 10 = 120 ➔ 12 x 5 = 60 ➔ นำมาบวกกัน 120 + 60 = 180 ครับ!" },
      { id: "p4_m6", type: "division", question: "Solve: 245 / 5 = ?", visual: "245 / 5", options: ["45", "49", "51"], answer: "49", explanation: "หารยาว: 240 / 5 = 48 ➔ 5 / 5 = 1 ➔ บวกกันเป็น 48 + 1 = 49 พอดีครับ!" },
      { id: "p4_m7", type: "decimal_compare", question: "Which statement is correct? (ข้อความใดถูกต้อง?)", visual: "0.45 vs 0.5", options: ["0.45 > 0.5", "0.45 < 0.5", "0.45 = 0.5"], answer: "0.45 < 0.5", explanation: "0.5 เท่ากับ 0.50 ➔ เปรียบเทียบหลักทศนิยมแรก (หลักสิบ) 5 มากกว่า 4 ดังนั้น 0.45 น้อยกว่า (<) 0.5 ครับ!" },
      { id: "p4_m8", type: "fraction_add", question: "Solve: 3/9 + 4/9 = ?", visual: "3/9 + 4/9", options: ["7/18", "7/9", "6/9"], answer: "7/9", explanation: "ส่วนเท่ากัน นำเศษบวกกัน 3 + 4 = 7 ได้คำตอบ 7/9 ครับ!" },
      { id: "p4_m9", type: "elapsed_time", question: "If a quiz starts at 1:15 PM and lasts 45 minutes, what time does it end?", visual: "1:15 PM + 45 mins", options: ["1:45 PM", "2:00 PM", "2:15 PM"], answer: "2:00 PM", explanation: "15 นาที บวก 45 นาที = 60 นาทีพอดี ซึ่งปัดเต็ม 1 ชั่วโมง ทำให้เปลี่ยนเป็นบ่ายสองโมงตรง หรือ 2:00 PM ครับ!" },
      { id: "p4_m10", type: "large_numbers", question: "What is the value of 5 in 154,200? (ค่าของเลข 5 ในหลักแสน)", visual: "154,200", options: ["5,000", "50,000", "500,000"], answer: "50,000", explanation: "เลข 5 อยู่ในตำแหน่งหลักหมื่นพอดี ค่าประหลักของมันจึงเป็น 50,000 (ห้าหมื่น) ครับ!" }
    ],
    english: [
      { id: "p4_e1", type: "grammar", question: "Choose the correct form: Look! The birds ______ in the sky.", visual: "Look! (Current action)", options: ["fly", "are flying", "flew"], answer: "are flying", explanation: "มีคำชี้บอกสถานการณ์กระชั้นชิด 'Look!' แสดงความต่อเนื่องด้วยโครงสร้าง Present Continuous ➔ are flying ครับ!" },
      { id: "p4_e2", type: "comparative", question: "Complete: A cow is ______ than a chicken.", visual: "🐮 vs 🐔", options: ["big", "bigger", "biggest"], answer: "bigger", explanation: "เปรียบเทียบขนาดตัวของสองสิ่ง ใช้ขั้นกว่า เติม -er และสระสั้นต้องเบิ้ลตัวสะกด g ➔ bigger ครับ!" },
      { id: "p4_e3", type: "grammar", question: "Complete: Right now, Farmer Bob ______ the dry soil.", visual: "Right now", options: ["digs", "is digging", "dug"], answer: "is digging", explanation: "มีคำชี้บอกเหตุการณ์กำลังดำเนินอยู่ 'Right now' ใช้โครงสร้าง is/am/are + V.ing ➔ is digging ครับ!" },
      { id: "p4_e4", type: "modal", question: "Complete the sentence: You ______ wash your hands before eating.", options: ["should (ควรจะ)", "might (อาจจะ)", "will (จะ)"], answer: "should (ควรจะ)", explanation: "เป็นการเสนอคำแนะนำด้านสุขอนามัยที่ดี คำกริยาช่วยที่แปลว่าควรทำคือ should ครับ!" },
      { id: "p4_e5", type: "directions", question: "Complete the map query: Go straight and then ______ right.", visual: "➡️ Turn", options: ["go", "turn", "walk"], answer: "turn", explanation: "คำสั่งเส้นทางการนำทางเลี้ยวขวา ภาษาอังกฤษสะกดคือ turn right (เลี้ยวขวา) ครับ!" },
      { id: "p4_e6", type: "comparative", question: "Complete: A sheep's wool is ______ than a pig's skin.", options: ["soft", "softer", "softest"], answer: "softer", explanation: "เปรียบเทียบความนุ่มของสองสิ่ง ใช้เปรียบเทียบขั้นกว่า เติม -er ต่อท้าย ➔ softer (นุ่มกว่า) ครับ!" },
      { id: "p4_e7", type: "grammar", question: "Complete: What ______ you doing at the moment?", options: ["is", "am", "are"], answer: "are", explanation: "โครงสร้างคำถามต่อเนื่องใช้สรรพนาม You ประธานพหูพจน์ต้องจับคู่กับ are ➔ What are you doing? ครับ!" },
      { id: "p4_e8", type: "modal", question: "Complete: Birds ______ fly, but pigs cannot.", options: ["can", "must", "should"], answer: "can", explanation: "ความสามารถโดยธรรมชาติของนก กริยาช่วยชี้บอกว่าทำได้คือ can (สามารถ) ครับ!" },
      { id: "p4_e9", type: "directions", question: "Complete the direction: Walk to the gate and ______ left.", visual: "⬅️", options: ["go", "turn", "swim"], answer: "turn", explanation: "ทิศทางการเลี้ยวซ้ายสะกดในรูปประโยคคือ turn left ครับ!" },
      { id: "p4_e10", type: "comparative", question: "Complete: A giraffe is ______ than a sheep.", visual: "🦒 vs 🐑", options: ["tall", "taller", "tallest"], answer: "taller", explanation: "เปรียบเทียบส่วนสูงของสองสิ่ง ใช้รูปขั้นกว่าโดยการเติม -er ➔ taller ครับ!" }
    ]
  },
  "level-p5": {
    name: "Grade 5 (ประถมศึกษาปีที่ 5 / ป.5)",
    math: [
      { id: "p5_m1", type: "fraction_multiply", question: "Solve: 2/3 x 4/5 = ?", visual: "2/3 x 4/5", options: ["8/15", "6/8", "6/15"], answer: "8/15", explanation: "การคูณเศษส่วน: จับเศษคูณเศษด้านบน (2 x 4 = 8) และส่วนคูณส่วนด้านล่าง (3 x 5 = 15) ได้เป็น 8/15 ครับ!" },
      { id: "p5_m2", type: "volume", question: "Find the volume of a box: width 2cm, length 3cm, height 4cm:", visual: "Box 2 x 3 x 4", options: ["12 cubic cm", "20 cubic cm", "24 cubic cm"], answer: "24 cubic cm", explanation: "สูตรหาปริมาตรทรงสี่เหลี่ยมมุมฉาก = กว้าง x ยาว x สูง ➔ 2 x 3 x 4 = 24 ลูกบาศก์เซนติเมตรครับ!" },
      { id: "p5_m3", type: "percentage", question: "Convert 0.25 into a percentage:", visual: "0.25", options: ["2.5%", "25%", "250%"], answer: "25%", explanation: "แปลงทศนิยมเป็นเปอร์เซ็นต์ คูณด้วย 100 ➔ 0.25 x 100 = 25% ครับ!" },
      { id: "p5_m4", type: "angle", question: "What is the sum of angles inside a triangle? (มุมภายในสามเหลี่ยมรวมกันได้กี่องศา?)", options: ["90 degrees", "180 degrees", "360 degrees"], answer: "180 degrees", explanation: "ตามทฤษฎีเรขาคณิต ผลรวมของขนาดของมุมภายในของรูปสามเหลี่ยมใดๆ จะเท่ากับ 180 องศาเสมอครับ!" },
      { id: "p5_m5", type: "fraction_divide", question: "Solve: 1/2 / 3 = ?", visual: "1/2 / 3", options: ["1/6", "3/2", "2/3"], answer: "1/6", explanation: "เปลี่ยนเครื่องหมายหารเป็นคูณ กลับเศษเป็นส่วนของตัวหาร ➔ 1/2 x 1/3 = 1/6 ครับ!" },
      { id: "p5_m6", type: "decimal_multiply", question: "Solve: 0.3 x 0.4 = ?", visual: "0.3 x 0.4", options: ["1.2", "0.12", "0.012"], answer: "0.12", explanation: "นำ 3 x 4 = 12 ➔ นับทศนิยมรวมกัน: 1 ตำแหน่ง + 1 ตำแหน่ง = 2 ตำแหน่ง สรุปตอบ 0.12 ครับ!" },
      { id: "p5_m7", type: "volume", question: "Find the volume of a cube with side length 3m:", visual: "Cube 3 x 3 x 3", options: ["9 cubic m", "18 cubic m", "27 cubic m"], answer: "27 cubic m", explanation: "ปริมาตรลูกบาศก์ = ด้าน x ด้าน x ด้าน ➔ 3 x 3 x 3 = 27 ลูกบาศก์เมตรครับ!" },
      { id: "p5_m8", type: "percentage", question: "What is 50% of 120 coins?", options: ["50", "60", "70"], answer: "60", explanation: "50% หมายถึงครึ่งหนึ่งของจำนวนเต็มพอดี ➔ 120 หารด้วย 2 = 60 เหรียญทองครับ!" },
      { id: "p5_m9", type: "fraction_multiply", question: "Solve: 3/4 x 1/2 = ?", visual: "3/4 x 1/2", options: ["3/8", "4/6", "3/6"], answer: "3/8", explanation: "คูณตามหลักเศษส่วน: (3 x 1) / (4 x 2) = 3/8 ครับ!" },
      { id: "p5_m10", type: "angle", question: "A right angle is exactly ______ degrees. (มุมฉากมีขนาดกี่องศา?)", options: ["45", "90", "180"], answer: "90", explanation: "มุมฉาก (Right angle) มีขนาดมุมตั้งฉากคงที่เท่ากับ 90 องศาครับ!" }
    ],
    english: [
      { id: "p5_e1", type: "grammar_past", question: "Complete the sentence: Yesterday, Farmer Joe ______ to the market.", visual: "Yesterday", options: ["go", "goes", "went"], answer: "went", explanation: "เหตุการณ์เกิดขึ้นในอดีต (Yesterday) กริยาช่อง 2 แบบอปกติของ go คือ went ครับ!" },
      { id: "p5_e2", type: "modal", question: "Complete: If you feel sick, you ______ see a doctor.", options: ["should (ควรจะ)", "must not (ห้าม)", "might (อาจจะ)"], answer: "should (ควรจะ)", explanation: "เป็นการเสนอแนะหรือให้คำแนะนำที่เหมาะควร ปัจจัยคือ should ครับ!" },
      { id: "p5_e3", type: "frequency", question: "Complete the sentence: The sun ______ rises in the east.", options: ["always (เสมอ)", "sometimes (บางครั้ง)", "never (ไม่เคย)"], answer: "always (เสมอ)", explanation: "พระอาทิตย์ขึ้นทางทิศตะวันออกเป็นความจริงตามธรรมชาติตลอดเวลา 100% จึงต้องใช้คำว่า always ครับ!" },
      { id: "p5_e4", type: "grammar_past", question: "Complete: Last night, the chickens ______ early.", visual: "Last night", options: ["sleep", "slept", "sleeping"], answer: "slept", explanation: "อดีตชี้บอกช่วงค่ำวานนี้ (Last night) กริยาช่อง 2 ของ sleep ปรับรูปคือ slept ครับ!" },
      { id: "p5_e5", type: "modal", question: "Complete: You ______ feed the cows daily. They are hungry.", options: ["must (ต้อง)", "should not", "might"], answer: "must (ต้อง)", explanation: "มีความจำเป็นอย่างยิ่ง/หน้าที่สำคัญที่ขาดไม่ได้ในการป้อนอาหารวัว ใช้คำหนักแน่นคือ must ครับ!" },
      { id: "p5_e6", type: "frequency", question: "Complete: I ______ plant seeds when it rains. (I do not like wet mud)", options: ["always", "usually", "never"], answer: "never", explanation: "เพราะระบุเหตุผลว่าเกลียดดินโคลนแฉะ ดังนั้นไม่ทำแน่ๆ ความถี่เป็น 0% คือ never (ไม่เคย) ครับ!" },
      { id: "p5_e7", type: "grammar_past", question: "Complete: An hour ago, Farmer Bob ______ watering the plots.", visual: "An hour ago", options: ["finish", "finished", "finishing"], answer: "finished", explanation: "มีตัวชี้อดีตชัดเจน 'An hour ago' คำกริยาปกติเติมท้ายด้วย -ed ➔ finished ครับ!" },
      { id: "p5_e8", type: "grammar_past", question: "Complete: Yesterday, the chick ______ out of its shell.", options: ["hatch", "hatched", "is hatching"], answer: "hatched", explanation: "Yesterday แสดงเหตุการณ์อดีต กริยาเติม -ed ➔ hatched (ฟักไข่ออกมาแล้ว) ครับ!" },
      { id: "p5_e9", type: "modal", question: "Complete: We ______ waste clean water on the farm.", options: ["must not (ต้องไม่)", "may", "can"], answer: "must not (ต้องไม่)", explanation: "ข้อบังคับหรือห้ามปฏิบัติอย่างเด็ดขาดเพื่ออนุรักษ์น้ำสะอาด คือ must not (ต้องไม่/ห้าม) ครับ!" },
      { id: "p5_e10", type: "frequency", question: "Complete: Farmer Joe is busy. He ______ works on weekends.", options: ["usually (ปกติ)", "never", "might"], answer: "usually (ปกติ)", explanation: "เพราะลุงชาวนาทำงานยุ่งมาก จึงปกติจะลุยไร่สวนวันเสาร์อาทิตย์เป็นประจำเป็นนิสัย ➔ usually ครับ!" }
    ]
  },
  "level-p6": {
    name: "Grade 6 (ประถมศึกษาปีที่ 6 / ป.6)",
    math: [
      { id: "p6_m1", type: "gcd", question: "Find the G.C.D (ห.ร.ม.) of 8 and 12:", visual: "G.C.D of 8 and 12", options: ["2", "4", "6"], answer: "4", explanation: "ห.ร.ม. (หารร่วมมาก): ตัวหารร่วมของ 8 และ 12 คือ 1, 2, 4 ตัวที่ยิ่งใหญ่สุดคือ 4 ตอบ 4 ครับ!" },
      { id: "p6_m2", type: "lcm", question: "Find the L.C.M (ค.ร.น.) of 4 and 6:", visual: "L.C.M of 4 and 6", options: ["12", "18", "24"], answer: "12", explanation: "ค.ร.น. (คูณร่วมน้อย): เลขพหุคูณร่วมที่น้อยที่สุดที่ทั้ง 4 และ 6 หารลงตัวคือ 12 ครับ!" },
      { id: "p6_m3", type: "equation", question: "Solve for x: x + 15 = 40", visual: "x + 15 = 40", options: ["20", "25", "30"], answer: "25", explanation: "ย้ายข้างสมการ: ย้าย +15 จากฝั่งซ้ายไปเป็นลบฝั่งขวา ➔ x = 40 - 15 จะได้ x = 25 ครับ!" },
      { id: "p6_m4", type: "circle", question: "What is the circumference of a circle with radius 7m? (Take pi = 22/7)", visual: "Circumference r=7", options: ["22m", "44m", "154m"], answer: "44m", explanation: "สูตรเส้นรอบวง = 2 x pi x r ➔ 2 x (22/7) x 7 = 2 x 22 = 44 เมตรครับ!" },
      { id: "p6_m5", type: "ratio", question: "If the ratio of seeds to water is 2:3, and you have 6 seeds, how much water do you need?", visual: "Seeds:Water = 2:3", options: ["6", "9", "12"], answer: "9", explanation: "ขยายอัตราส่วน: 2 ขยายเป็น 6 (คูณ 3) ดังนั้นน้ำ 3 ก็ต้องคูณ 3 ไปด้วย ➔ 3 x 3 = 9 ส่วนครับ!" },
      { id: "p6_m6", type: "gcd", question: "Find the G.C.D (ห.ร.ม.) of 15 and 25:", options: ["3", "5", "15"], answer: "5", explanation: "ห.ร.ม. ของ 15 และ 25: จำนวนมากที่สุดที่หารทั้งคู่นี้ลงตัวคือ 5 ครับ!" },
      { id: "p6_m7", type: "lcm", question: "Find the L.C.M (ค.ร.น.) of 6 and 8:", options: ["12", "24", "48"], answer: "24", explanation: "ค.ร.น. ของ 6 และ 8: เลขร่วมตัวแรกสุดคือ 24 (เพราะ 6x4 = 24 และ 8x3 = 24) ครับ!" },
      { id: "p6_m8", type: "equation", question: "Solve for x: 3x - 5 = 19", visual: "3x - 5 = 19", options: ["6", "7", "8"], answer: "8", explanation: "ย้าย -5 ไปเป็นบวก: 3x = 19 + 5 = 24 ➔ ย้าย 3 ไปหาร: x = 24 / 3 = 8 ครับ!" },
      { id: "p6_m9", type: "circle", question: "Find the area of a circle with radius 7m: (Take pi = 22/7)", visual: "Area of Circle r=7", options: ["44 sq.m.", "154 sq.m.", "308 sq.m."], answer: "154 sq.m.", explanation: "สูตรพื้นที่วงกลม = pi x r x r ➔ (22/7) x 7 x 7 = 22 x 7 = 154 ตารางเมตรครับ!" },
      { id: "p6_m10", type: "ratio", question: "Simple the ratio 12:18 to its simplest form: (ทำอัตราส่วน 12:18 เป็นอย่างต่ำ)", options: ["2:3", "3:4", "4:5"], answer: "2:3", explanation: "เอา ห.ร.ม. คือ 6 มาหารออกทั้งสองฝั่ง: 12/6 = 2 และ 18/6 = 3 จะได้เป็นอัตราส่วนอย่างต่ำ 2:3 ครับ!" }
    ],
    english: [
      { id: "p6_e1", type: "grammar_passive", question: "Change to Passive: 'The farmer plants the seed.'", visual: "Active Voice", options: ["The seed is planted by the farmer.", "The seed was planted by the farmer.", "The farmer is planting the seed."], answer: "The seed is planted by the farmer.", explanation: "โครงสร้าง Present Simple Passive: Object + is/am/are + V.3 ➔ 'The seed is planted by the farmer.' ครับ!" },
      { id: "p6_e2", type: "conjunction", question: "Complete: The crops grew fast ______ it rained.", options: ["but", "because", "so"], answer: "because", explanation: "เป็นการเชื่อมประโยคชี้แจงส่วนของ 'เหตุและผล' (ผลคือโตเร็ว เหตุคือฝนตก) จึงใช้เพราะว่า (because) ครับ!" },
      { id: "p6_e3", type: "idiom", question: "What does the idiom 'Piece of cake' mean?", visual: "🍰", options: ["A very easy task (งานที่ง่ายมาก)", "A delicious dessert", "A difficult job"], answer: "A very easy task (งานที่ง่ายมาก)", explanation: "สำนวนพูดเปรียบเปรย 'Piece of cake' มีความหมายแฝงหมายถึง งานหรือกิจกรรมที่ง่ายมากสะดวกรวดเร็วครับ!" },
      { id: "p6_e4", type: "synonym", question: "Which word is the synonym of 'QUICK'?", options: ["Slow", "Fast", "Heavy"], answer: "Fast", explanation: "Quick และ Fast ต่างแปลว่า ว่องไว/รวดเร็ว จึงเป็นคำพ้องความหมาย (Synonym) ครับ!" },
      { id: "p6_e5", type: "grammar_passive", question: "Change to Passive: 'The chicken laid the egg.'", visual: "Past Voice", options: ["The egg was laid by the chicken.", "The egg is laid by the chicken.", "The egg was layed by the chicken."], answer: "The egg was laid by the chicken.", explanation: "ประโยคดั้งเดิมเป็นอดีต (laid) โครงสร้าง Passive ในรูปอดีตคือ was/were + V.3 ➔ 'The egg was laid by...' ครับ!" },
      { id: "p6_e6", type: "conjunction", question: "Complete: We watered the soil, ______ it was dry.", options: ["but", "because", "so"], answer: "because", explanation: "เราลงมือรดน้ำดิน (ผล) เพราะว่ามันมีความแห้งแล้งแห้งผาก (เหตุ) เชื่อมด้วย because ครับ!" },
      { id: "p6_e7", type: "idiom", question: "What does the idiom 'Under the weather' mean?", visual: "🤒", options: ["Feeling sick (รู้สึกป่วย/ไม่สบาย)", "Raining heavily", "Hot weather"], answer: "Feeling sick (รู้สึกป่วย/ไม่สบาย)", explanation: "สำนวนพูด 'Under the weather' เป็นแสลงแฝงหมายถึง การเจ็บไข้ได้ป่วยหรือครั่นเนื้อครั่นตัวครับ!" },
      { id: "p6_e8", type: "conjunction", question: "Complete: The seeds were tiny, ______ we planted them carefully.", options: ["and", "but", "so"], answer: "so", explanation: "เมล็ดพันธุ์มีขนาดเล็กมาก (เหตุ) ดังนั้นพวกเราจึงระวังตอนหย่อนลงแปลง (ผล) เชื่อมด้วย so ครับ!" },
      { id: "p6_e9", type: "synonym", question: "What is the synonym of the word 'SAD'?", options: ["Unhappy", "Glad", "Angry"], answer: "Unhappy", explanation: "Sad และ Unhappy ต่างบ่งบอกความหม่นหมองเศร้าโศกไร้ความสุขใจ จึงเป็นคำพ้องกันครับ!" },
      { id: "p6_e10", type: "idiom", question: "What does the idiom 'On cloud nine' mean?", visual: "☁️9️⃣", options: ["Very happy (มีความสุขล้นพ้น)", "Lost in the fog", "Flying a kite"], answer: "Very happy (มีความสุขล้นพ้น)", explanation: "สำนวน 'On cloud nine' หมายความว่า มีความสุขมากมายทะลุชั้นเมฆเก้าชั้นขึ้นไปครับ!" }
    ]
  }
};

window.lessonsData = {
  "level-kg": [
    {
      id: "kg_les_count",
      title: "Math Ch.1: Counting 1-5 🍎 (นับเลขแสนสนุก 1-5)",
      subject: "Mathematics",
      badgeId: "badge_kg_count",
      badgeName: "Counting Bunny",
      badgeEmoji: "🐰",
      slides: [
        { text: "สวัสดีครับคุณหนูๆ และผู้ปกครอง! ครูนกฮูก 🦉 ยินดีต้อนรับสู่บทเรียนนับเลข **1 ถึง 5** ไปด้วยกันนะ!<br><br>มาจำหน้าตาและออกเสียงตัวเลขไปพร้อมกันครับ:<br>• **1** (หนึ่ง) | **2** (สอง)<br>• **3** (สาม) | **4** (สี่)<br>• **5** (ห้า)", visual: "1️⃣ 2️⃣ 3️⃣ 4️⃣ 5️⃣" },
        { text: "เทคนิคการนับ: **ใช้นิ้วชี้จิ้มสิ่งของแล้วเปล่งเสียงตามจังหวะ** เพื่อให้เด็กเชื่อมโยงวัตถุกับตัวเลข เช่นนับแอปเปิ้ล:<br><br>• จิ้มผลแรก 🍎 ➔ พูดดังๆ ว่า **'หนึ่ง!'**<br>• จิ้มผลที่สอง 🍎 ➔ พูดว่า **'สอง!'**<br>• จิ้มผลที่สาม 🍎 ➔ พูดว่า **'สาม!'**<br>ตัวเลขสุดท้ายที่เราพูดออกเสียงออกมาก็คือจำนวนรวมทั้งหมด สรุปมีแอปเปิ้ล **3 ผล** ครับ!", visual: "👆 🍎 🍎 🍎" },
        { text: "🎓 **คู่มือสำหรับผู้ปกครอง (Parent Guide):**<br><br>• **เป้าหมาย**: พัฒนาทักษะการจับคู่หนึ่งต่อหนึ่ง (One-to-one correspondence) ของเด็ก<br>• **วิธีสอน**: หยิบแอปเปิ้ลหรือของเล่นในบ้านมาวาง ชี้มือเด็กจิ้มไปพร้อมกันทีละชิ้น ห้ามชี้ข้ามหรือนับเร็วไป<br>• **ข้อควรระวัง**: เด็กบางคนนับปากเปล่าเร็วเกินตัวชี้ ให้จับมือชี้ของและนับให้จังหวะตรงกันครับ", visual: "👨‍👩‍👧‍👦 Parent Tip" }
      ],
      postTest: [
        { question: "How many apples? (มีแอปเปิ้ลกี่ผล?)", visual: "🍎🍎", options: ["1", "2", "3"], answer: "2", explanation: "จิ้มนับแอปเปิ้ลทีละผล: 1, 2 รวมมีทั้งหมด 2 ผลพอดีครับ!" },
        { question: "How many carrots? (มีแครอทกี่หัว?)", visual: "🥕🥕🥕🥕", options: ["3", "4", "5"], answer: "4", explanation: "จิ้มนับแครอททีละหัวจนถึงหัวสุดท้าย: 1, 2, 3, 4 หัวพอดีครับ!" },
        { question: "How many ducks? (มีเป็ดกี่ตัว?)", visual: "🦆", options: ["1", "2", "3"], answer: "1", explanation: "มีเป็ดว่ายน้ำอยู่เพียง 1 ตัวเท่านั้น ดังนั้นตอบ 1 ครับ!" },
        { question: "How many pigs? (มีหมูกี่ตัว?)", visual: "🐷🐷🐷", options: ["2", "3", "4"], answer: "3", explanation: "จิ้มนับหมูทีละตัว: 1, 2, 3 ตัวพอดี ตอบ 3 ครับ!" },
        { question: "How many eggs? (มีไข่กี่ฟอง?)", visual: "🥚🥚🥚🥚🥚", options: ["4", "5", "6"], answer: "5", explanation: "จิ้มนับไข่ในรังทีละฟองได้ทั้งหมด 5 ฟองพอดีครับ!" }
      ]
    },
    {
      id: "kg_les_shapes",
      title: "Math Ch.2: Shapes around Us 🟦 (รูปทรงเรขาคณิต)",
      subject: "Mathematics",
      badgeId: "badge_kg_shapes",
      badgeName: "Shape Finder",
      badgeEmoji: "🎨",
      slides: [
        { text: "บทเรียนต่อมาคือการจำแนก **รูปทรงพื้นฐาน** สามเหลี่ยม สี่เหลี่ยม และวงกลมครับ:<br><br>• 🔴 **วงกลม (Circle)**: เส้นโค้งวนกลมเกลี้ยง ไม่มีขอบไม่มีมุมแหลม<br>• 🟦 **สี่เหลี่ยม (Square)**: มี 4 มุม มี 4 ด้านเท่ากัน ตรงระเบียบ<br>• 🔺 **สามเหลี่ยม (Triangle)**: มี 3 ด้าน มีมุมแหลม 3 มุมชี้ฟ้า", visual: "🔴 🟦 🔺" },
        { text: "ในชีวิตจริงเรามองเห็นรูปทรงเหล่านี้ทุกที่ เช่น:<br><br>• 🪙 **เงินเหรียญ** ➔ เป็นรูป **วงกลม (Circle)**<br>• 📦 **กล่องพัสดุ** ➔ เป็นรูป **สี่เหลี่ยม (Square)**<br>• 🍕 **ชิ้นพิซซ่า** ➔ เป็นรูป **สามเหลี่ยม (Triangle)**<br>ลองชวนลูกมองสิ่งของรอบตัวแล้วทายดูนะ!", visual: "🪙 📦 🍕" },
        { text: "🎓 **คู่มือสำหรับผู้ปกครอง (Parent Guide):**<br><br>• **เป้าหมาย**: เสริมทักษะการรับรู้และการจำแนกทางมิติสัมพันธ์เบื้องต้น<br>• **วิธีสอน**: ลากเส้นแต่ละรูปทรงลงกระดาษ หรือให้เด็กลากนิ้วสัมผัสขอบจาน (วงกลม) หรือมุมกล่องนม (สี่เหลี่ยม) เพื่อทำความเข้าใจขอบข่ายรูปทรงด้วยประสาทสัมผัส<br>• **คำถามนำ**: 'แซนวิชชิ้นนี้เป็นรูปทรงอะไรนะ?' ชี้ให้เขานับมุมแหลมร่วมกัน", visual: "👨‍👩‍👧‍👦 Parent Tip" }
      ],
      postTest: [
        { question: "Which shape is a circle? (รูปทรงใดคือวงกลม?)", visual: "🔴", options: ["Circle", "Square", "Triangle"], answer: "Circle", explanation: "เส้นโค้งมนไม่มีมุมแหลมคือกดวงกลม (Circle) ครับ!" },
        { question: "Which shape is a square? (รูปทรงใดคือสี่เหลี่ยม?)", visual: "🟦", options: ["Circle", "Square", "Triangle"], answer: "Square", explanation: "มี 4 มุมและ 4 ด้านตรงเท่ากันคือกดรูปทรงสี่เหลี่ยม (Square) ครับ!" },
        { question: "Which shape is a triangle? (รูปทรงใดคือสามเหลี่ยม?)", visual: "🔺", options: ["Circle", "Square", "Triangle"], answer: "Triangle", explanation: "มี 3 มุมแหลมเหมือนหลังคาจั่วคือกดรูปทรงสามเหลี่ยม (Triangle) ครับ!" },
        { question: "What shape is a coin? (เงินเหรียญมีรูปทรงแบบใด?)", visual: "🪙", options: ["Circle", "Square", "Triangle"], answer: "Circle", explanation: "เงินเหรียญมีลักษณะโค้งมนแบนเรียบ ไม่มีมุมฉาก จึงเป็นวงกลมครับ!" },
        { question: "What shape is a package box? (กล่องพัสดุเป็นรูปทรงอะไร?)", visual: "📦", options: ["Circle", "Square", "Triangle"], answer: "Square", explanation: "กล่องพัสดุมี 4 ด้านเท่ากันและมุมฉาก จึงเปรียบเป็นรูปสี่เหลี่ยมครับ!" }
      ]
    },
    {
      id: "kg_les_phonics",
      title: "English Ch.1: Letter Sounds A-C 🔤 (เสียงโฟนิกส์ A-C)",
      subject: "English",
      badgeId: "badge_kg_phonics",
      badgeName: "Phonics Baby",
      badgeEmoji: "👶",
      slides: [
        { text: "สวัสดีครับผู้ปกครอง! ยินดีต้อนรับสู่บทเรียน **Phonics** เสียงตัวอักษร A, B, C เบื้องต้นครับ:<br><br>ในการหัดอ่านภาษาอังกฤษ เด็กๆ ไม่ควรอ่านแค่ชื่ออักษร เอ-บี-ซี แต่ต้องจำ **เสียงพยัญชนะต้น** ของอักษรเหล่านั้นให้ได้ก่อน เพื่อใช้สะกดคำในอนาคตครับ!", visual: "A B C" },
        { text: "ออกเสียงตามครูนกฮูกนะเด็กๆ:<br><br>• 🅰️ **Letter A** ➔ ออกเสียงสั้นว่า **'แอะ'** (ae) เช่น A-A-Apple<br>• 🅱️ **Letter B** ➔ ออกเสียงพยัญชนะต้น **'เบอะ'** (be) เช่น B-B-Banana<br>• 🅾️ **Letter C** ➔ ออกเสียงกักเสียง **'เคอะ'** (ke) เช่น C-C-Cat<br>ลองเลียนเสียงตามจังหวะเสียงสนุกๆ ดูนะ!", visual: "🍎 🍌 🐱" },
        { text: "🎓 **คู่มือสำหรับผู้ปกครอง (Parent Guide):**<br><br>• **เป้าหมาย**: ช่วยเด็กออกเสียงต้นเสียงภาษาอังกฤษ (Initial Sounds) ได้ถูกต้อง<br>• **วิธีสอน**: ออกเสียงเน้นย้ำเสียงแรกชัด ๆ เช่น พูด 'แอะ-แอะ-แอปเปิ้ล' หรือ 'เคอะ-เคอะ-แคท' ชวนให้ลูกสังเกตริมฝีปากและช่องคอขณะเปล่งเสียง<br>• **เกร็ดความรู้**: หลีกเลี่ยงการออกเสียงปนสะกดภาษาไทยแบบไม่มีพยัญชนะสะกัด ฝึกบ่อยๆ วันละ 5 นาทีจะช่วยการหัดสะกดคำ (Blending) ในระดับประถมได้ดีมากครับ", visual: "👨‍👩‍👧‍👦 Parent Tip" }
      ],
      postTest: [
        { question: "What sound does the letter 'A' make? (เสียงโฟนิกส์ตัว A)", visual: "A", options: ["แอะ (ae)", "เบอะ (be)", "เคอะ (ke)"], answer: "แอะ (ae)", explanation: "อักษร A แทนหน่วยเสียงสระสั้นสะท้อนออกเสียง แอะ (ae) ครับ!" },
        { question: "What sound does the letter 'B' make? (เสียงโฟนิกส์ตัว B)", visual: "B", options: ["แอะ (ae)", "เบอะ (be)", "เดอะ (de)"], answer: "เบอะ (be)", explanation: "อักษร B แทนเสียงพยัญชนะต้นเปล่งลมปาก เบอะ (be) ครับ!" },
        { question: "What sound does the letter 'C' make? (เสียงโฟนิกส์ตัว C)", visual: "C", options: ["เบอะ (be)", "เคอะ (ke)", "เดอะ (de)"], answer: "เคอะ (ke)", explanation: "อักษร C แทนเสียงพยัญชนะต้นกักลมลำคอ เคอะ (ke) ครับ!" },
        { question: "What letter starts the word: 'Apple' (แอะ-แอะ-แอปเปิ้ล)?", visual: "🍎", options: ["A", "B", "C"], answer: "A", explanation: "Apple ขึ้นต้นด้วยหน่วยเสียงสะกด แอะ ซึ่งตรงคู่กับตัวอักษร A ครับ!" },
        { question: "What letter starts the word: 'Cat' (เคอะ-เคอะ-แคท)?", visual: "🐱", options: ["A", "B", "C"], answer: "C", explanation: "Cat ขึ้นต้นด้วยหน่วยเสียง เคอะ ซึ่งตรงคู่กับตัวอักษร C ครับ!" }
      ]
    }
  ],
  "level-p1": [
    {
      id: "p1_les_add",
      title: "Math Ch.1: Addition within 20 ➕ (บวกเลขแสนสนุกไม่เกิน 20)",
      subject: "Mathematics",
      badgeId: "badge_p1_add",
      badgeName: "Plus Beginner",
      badgeEmoji: "🛡️",
      slides: [
        { text: "ยินดีต้อนรับสู่บทเรียน **การบวกจำนวนไม่เกิน 20** ของพี่ ป.1 ครับ!<br><br>การบวก (Addition) คือ การนำสิ่งของสองกลุ่มมารวมกันเพื่อให้มีจำนวนมากขึ้น เช่นมีแครอท 5 หัว ได้เพิ่มมาอีก 3 หัว รวมกันเป็นเท่าใด?", visual: "5 + 3 = ?" },
        { text: "เทคนิคการบวกเลขเร็ว: **'การเก็บเลขมากไว้ในใจ'** แล้วนับต่อตามจำนวนน้อย<br><br>เช่นคิดโจทย์: **12 + 5**<br>• **ขั้นที่ 1**: เก็บเลขที่มีค่ามากคือ **12** ไว้ในใจ<br>• **ขั้นที่ 2**: ชูนิ้วตามจำนวนน้อยคือ **5** นิ้ว<br>• **ขั้นที่ 3**: นับต่อจาก 12 ไปอีกห้านิ้ว ➔ 13, 14, 15, 16, 17!<br>ผลลัพธ์คำตอบที่ได้คือ **17** ครับ สะดวกรวดเร็วมาก!", visual: "🧠 12 ➔ 👆 5 ➔ 17" },
        { text: "🎓 **คู่มือสำหรับผู้ปกครอง (Parent Guide):**<br><br>• **เป้าหมาย**: สร้างความเข้าใจเชิงมโนทัศน์เรื่องการรวมตัวเลข และลดความพึ่งพาการนับนิ้วมือจากศูนย์<br>• **วิธีสอน**: ใช้ผลไม้จำลองหรือถั่วสองกอง กองแรกมี 8 เม็ด กองสองมี 4 เม็ด บอกเด็กว่า 'ไม่ต้องนับกองแรกใหม่นะ จำว่ามี 8 แล้วนับเม็ดในกองสองต่อไปเลย 9, 10, 11, 12'<br>• **ข้อผิดพลาดพบบ่อย**: เด็กมักเริ่มนับของทั้งหมดใหม่ตั้งแต่ 1 ทำให้เสียเวลาและสับสนง่าย", visual: "👨‍👩‍👧‍👦 Parent Tip" }
      ],
      postTest: [
        { question: "Solve: 5 + 3 = ?", visual: "5 + 3", options: ["7", "8", "9"], answer: "8", explanation: "เก็บ 5 ไว้ในใจ ชูขึ้นมา 3 นิ้ว นับต่อ: 6, 7, 8 ได้คำตอบคือ 8 ครับ!" },
        { question: "Solve: 12 + 6 = ?", visual: "12 + 6", options: ["16", "18", "20"], answer: "18", explanation: "เก็บ 12 ไว้ในใจ นับเพิ่มไปอีก 6 นิ้ว: 13, 14, 15, 16, 17, 18 ตอบ 18 ครับ!" },
        { question: "Solve: 9 + 4 = ?", visual: "9 + 4", options: ["12", "13", "14"], answer: "13", explanation: "เก็บ 9 ไว้ในใจ นับต่ออีก 4 นิ้ว: 10, 11, 12, 13 ตอบ 13 ครับ!" },
        { question: "Solve: 15 + 3 = ?", visual: "15 + 3", options: ["17", "18", "19"], answer: "18", explanation: "เก็บ 15 นับต่ออีก 3 นิ้ว ได้เท่ากับ 18 ครับ!" },
        { question: "Solve: 8 + 7 = ?", visual: "8 + 7", options: ["14", "15", "16"], answer: "15", explanation: "เก็บ 8 นับต่ออีก 7 นิ้ว: 9, 10, 11, 12, 13, 14, 15 ตอบ 15 ครับ!" }
      ]
    },
    {
      id: "p1_les_sub",
      title: "Math Ch.2: Subtraction within 20 ➖ (การลบแสนสนุก)",
      subject: "Mathematics",
      badgeId: "badge_p1_sub",
      badgeName: "Minus Knight",
      badgeEmoji: "⚔️",
      slides: [
        { text: "ต่อมาคือวิธีกด **การลบจำนวนไม่เกิน 20** ของพี่ ป.1 ครับ!<br><br>การลบ (Subtraction) คือการหักจำนวนหนึ่งออกจากอีกจำนวน ทำให้มีค่าลดลง เช่นเก็บมะเขือเทศได้ 8 ผล แบ่งให้เพื่อนไป 3 ผล จะเหลือกี่ผล?", visual: "8 - 3 = ?" },
        { text: "เทคนิคการลบ: **'การนับย้อนกลับ'** หรือ **'การนับเพิ่มจากตัวลบ'**<br><br>คิดโจทย์: **15 - 4**<br>• วิธีนับย้อน: มี 15 หักนิ้วถอยหลังไปสี่ขั้น ➔ 14, 13, 12, 11! คำตอบคือ **11**<br>คิดโจทย์: **14 - 11**<br>• วิธีนับเพิ่ม: นับต่อจากตัวลบ 11 ไปให้ถึง 14 ➔ 12, 13, 14 (นับได้ 3 ขั้น) สรุปตอบ **3**!", visual: "🔢 15 ➔ 11" },
        { text: "🎓 **คู่มือสำหรับผู้ปกครอง (Parent Guide):**<br><br>• **เป้าหมาย**: ฝึกให้เด็กเปรียบเทียบความต่างของค่าตัวเลขและรู้วิธีลบที่เหมาะสมกับประเภทโจทย์<br>• **วิธีสอน**: หากตัวลบมีค่าน้อย (เช่น 12 - 2) ให้นับถอยหลังสองเก้า แต่หากตัวลบมีค่ามากและใกล้ตัวตั้ง (เช่น 12 - 9) ให้ชวนลูบคิดนับเพิ่มจาก 9 ไปถึง 12 แทน จะเร็วกว่ามาก<br>• **สิ่งสำคัญ**: สังเกตปฏิกิริยาของเด็กว่าสับสนระหว่างถอยหลังกับเดินหน้าบวกหรือไม่", visual: "👨‍👩‍👧‍👦 Parent Tip" }
      ],
      postTest: [
        { question: "Solve: 9 - 4 = ?", visual: "9 - 4", options: ["4", "5", "6"], answer: "5", explanation: "ชูนิ้วขึ้นมา 9 หักออกไป 4 นิ้ว จะเหลือนิ้วที่ตั้งอยู่ 5 นิ้ว ตอบ 5 ครับ!" },
        { question: "Solve: 16 - 3 = ?", visual: "16 - 3", options: ["12", "13", "14"], answer: "13", explanation: "นับถอยหลังจาก 16 ลงไป 3 ครั้ง: 15, 14, 13 ตอบ 13 ครับ!" },
        { question: "Solve: 15 - 12 = ?", visual: "15 - 12", options: ["2", "3", "4"], answer: "3", explanation: "ใช้วิธีนับเพิ่มจากตัวลบ 12 ไปถึง 15: นับ 13, 14, 15 ได้ทั้งหมด 3 ขั้น ตอบ 3 ครับ!" },
        { question: "Solve: 18 - 8 = ?", visual: "18 - 8", options: ["10", "11", "12"], answer: "10", explanation: "หลักหน่วยลบกันได้ 8 - 8 = 0 คงเหลือหลักสิบเดี่ยวตอบ 10 ครับ!" },
        { question: "Solve: 11 - 4 = ?", visual: "11 - 4", options: ["6", "7", "8"], answer: "7", explanation: "นับถอยหลังจาก 11 ลงไปสี่ครั้ง: 10, 9, 8, 7 คำตอบคือ 7 ครับ!" }
      ]
    },
    {
      id: "p1_les_spelling",
      title: "English Ch.1: Short Vowel CVC Words 🔤 (คำสระเสียงสั้นแสนสนุก)",
      subject: "English",
      badgeId: "badge_p1_cvc",
      badgeName: "Spelling Scout",
      badgeEmoji: "🏕️",
      slides: [
        { text: "ยินดีต้อนรับสู่ชั่วโมงสะกดคำภาษาอังกฤษของพี่ ป.1 ครับ!<br><br>เราจะเริ่มสะกดคำศัพท์สั้นๆ 3 ตัวอักษรที่มีโครงสร้าง **CVC (Consonant-Vowel-Consonant)** หรือ พยัญชนะต้น-สระ-ตัวสะกด ครับ เช่นคำว่า **Cat** (แมว)", visual: "C-A-T ➔ Cat" },
        { text: "เทคนิคการสะกดแบบโฟนิกส์ทีละตัว:<br><br>• 🔤 **c - a - t** ➔ เปล่งเสียงทีละคำ เคอะ - แอะ - เทอะ ➔ เมื่อออกเสียงรวบเร็วขึ้นจะกลายเป็น **'แคท'** (แมว)<br>• 🔤 **p - i - g** ➔ เปล่งเสียง เพอะ - อิ - เกอะ ➔ รวบเสียงเป็น **'พิก'** (หมู)<br>• 🔤 **h - e - n** ➔ เปล่งเสียง เฮอะ - เอะ - เนอะ ➔ รวบเสียงเป็น **'เฮน'** (แม่ไก่)", visual: "🐱 🐷  Hen (🐔)" },
        { text: "🎓 **คู่มือสำหรับผู้ปกครอง (Parent Guide):**<br><br>• **เป้าหมาย**: ฝึกให้เด็กจำแนกเสียงสระเสียงสั้นภาษาอังกฤษ (Short Vowels: a, e, i, o, u) ได้ชัดเจน<br>• **วิธีสอน**: เขียนคำสะกดลงกระดาษแล้วชวนลูกออกเสียงแยกทีละเสียง (เช่น /c/ /a/ /t/) จากนั้นลากนิ้วเชื่อมตัวอักษรเข้าด้วยกันเพื่อออกเสียงคำเต็ม<br>• **ข้อสังเกต**: ป.1 เป็นวัยที่จำสับสนระหว่างเสียงตัวสะกด 'b' (พุงไปขวา) และ 'd' (ก้นไปซ้าย) ได้บ่อย ผู้ปกครองสามารถสร้างเกมวาดรูปจำแนกสองตัวนี้ได้ครับ", visual: "👨‍👩‍👧‍👦 Parent Tip" }
      ],
      postTest: [
        { question: "Complete the spelling: c _ t (แมว)", visual: "🐱", options: ["a", "e", "i"], answer: "a", explanation: "แมวสะกดคือ C-A-T (เคอะ-แอะ-เทอะ) เติม a ครับ!" },
        { question: "Complete the spelling: p _ g (หมู)", visual: "🐷", options: ["a", "i", "o"], answer: "i", explanation: "หมูสะกดคือ P-I-G (เพอะ-อิ-เกอะ) เติม i ครับ!" },
        { question: "Complete the spelling: h _ n (แม่ไก่)", visual: "Hen (🐔)", options: ["a", "e", "u"], answer: "e", explanation: "แม่ไก่สะกดคือ H-E-N (เฮอะ-เอะ-เนอะ) เติม e ครับ!" },
        { question: "What is this word: d - o - g?", visual: "🐶", options: ["Cat", "Dog", "Pig"], answer: "Dog", explanation: "เปล่งเสียงสะกด: เดอะ-เอาะ-เกอะ รวมเป็นคำว่า Dog (สุนัข) ครับ!" },
        { question: "Complete the spelling: b _ g (กระเป๋า)", visual: "💼", options: ["a", "e", "o"], answer: "a", explanation: "กระเป๋าสะกดคือ B-A-G (เบอะ-แอะ-เกอะ) แบ็ก เติม a ครับ!" }
      ]
    }
  ],
  "level-p2": [
    {
      id: "p2_les_add_regroup",
      title: "Math Ch.1: Addition with Regrouping ➕ (การบวกมีตัวทด)",
      subject: "Mathematics",
      badgeId: "badge_p2_add_regroup",
      badgeName: "Addition Master",
      badgeEmoji: "🏆",
      slides: [
        { text: "สวัสดีครับพี่ๆ ป.2! วันนี้เรามาเรียน **การบวกแบบมีตัวทด** กันนะครับ<br><br>เมื่อเราบวกตัวเลขในหลักเดียวกันแล้วได้ผลลัพธ์มากกว่าหรือเท่ากับ 10 เราต้องนำเลขหลักสิบนั้นไปเป็น 'ตัวทด' ในหลักถัดไปทางซ้ายมือเสมอ เช่น 38 + 25 = ?", visual: "38 + 25 = ?" },
        { text: "วิธีบวกอย่างละเอียด:<br>• **ขั้นที่ 1 (หลักหน่วย)**: นำ 8 + 5 = 13 เขียนเลข **3** ไว้ที่หลักหน่วย และฝากเลข **1** ไปทดที่หลักสิบ<br>• **ขั้นที่ 2 (หลักสิบ)**: นำ 3 + 2 = 5 บวกกับตัวทดอีก 1 รวมเป็น **6**<br>คำตอบสุดท้ายที่ถูกต้องคือ **63** ครับ!", visual: "38 + 25 ➔ 63" },
        { text: "🎓 **คู่มือสำหรับผู้ปกครอง (Parent Guide):**<br><br>• **เป้าหมาย**: เข้าใจกลไกการรวมค่าและการทดเลขตามค่าประจำหลัก<br>• **วิธีสอน**: ใช้บล็อกไม้หรือดินสอ 10 แท่งมัดเป็นกำ (แทนหลักสิบ) เมื่อนับเศษชิ้นเดี่ยวได้เกิน 10 ให้เด็กจับมัดเป็นกำใหม่แล้วส่งไปกองหลักสิบ<br>• **จุดที่ควรเน้น**: เด็กมักลืมบวกตัวทดที่ฝากไว้ตอนคิดเลขในหลักสิบ ชวนลูกเช็คซ้ำเสมอ", visual: "👨‍👩‍👧‍👦 Parent Tip" }
      ],
      postTest: [
        { question: "Solve: 46 + 28 = ?", visual: "46 + 28", options: ["64", "74", "76"], answer: "74", explanation: "หลักหน่วย: 6+8=14 ใส่ 4 ทด 1 ➔ หลักสิบ: 4+2+ตัวทด 1=7 รวมเป็น 74 ครับ!" },
        { question: "Solve: 57 + 35 = ?", visual: "57 + 35", options: ["82", "92", "95"], answer: "92", explanation: "หลักหน่วย: 7+5=12 ใส่ 2 ทด 1 ➔ หลักสิบ: 5+3+ตัวทด 1=9 ตอบ 92 ครับ!" },
        { question: "Solve: 129 + 45 = ?", visual: "129 + 45", options: ["164", "174", "184"], answer: "174", explanation: "หลักหน่วย: 9+5=14 ใส่ 4 ทด 1 ➔ หลักสิบ: 2+4+ตัวทด 1=7 หลักร้อยคงเดิม ตอบ 174 ครับ!" },
        { question: "Solve: 68 + 17 = ?", visual: "68 + 17", options: ["75", "85", "95"], answer: "85", explanation: "หลักหน่วย: 8+7=15 ใส่ 5 ทด 1 ➔ หลักสิบ: 6+1+ตัวทด 1=8 ตอบ 85 ครับ!" },
        { question: "Solve: 89 + 12 = ?", visual: "89 + 12", options: ["91", "101", "111"], answer: "101", explanation: "หลักหน่วย: 9+2=11 ใส่ 1 ทด 1 ➔ หลักสิบ: 8+1+ตัวทด 1=10 ตอบ 101 ครับ!" }
      ]
    }
  ],
  "level-p3": [
    {
      id: "p3_les_frac",
      title: "Math Ch.1: Introduction to Fractions 🍕 (เศษส่วนเบื้องต้น)",
      subject: "Mathematics",
      badgeId: "badge_p3_frac",
      badgeName: "Fraction Rookie",
      badgeEmoji: "🥉",
      slides: [
        { text: "ยินดีต้อนรับสู่ชั่วโมงเศษส่วนครับพี่ๆ ป.3!<br><br>เศษส่วน (Fractions) คือการเขียนแทน **การแบ่งของหนึ่งชิ้นออกเป็นส่วนๆ เท่ากัน** เช่นมีพิซซ่า 1 ถาด แบ่งเป็น 4 ส่วนเท่ากัน แต่ละชิ้นจะเรียกว่าเศษหนึ่งส่วนสี่ (1/4)", visual: "🍕 1/4" },
        { text: "ทำความเข้าใจโครงสร้างเศษส่วน:<br>•  ऊपर (ตัวเศษ): บอกจำนวนชิ้นที่หยิบมา หรือเลือกไว้<br>• नीचे (ตัวส่วน): บอกจำนวนชิ้นทั้งหมดที่ถูกแบ่งเท่าๆ กัน<br><br>เช่นรูป 🍕 มี 4 ชิ้น หยิบไปกิน 1 ชิ้น จะเหลืออยู่ 3 ชิ้น คิดเป็นเศษส่วนของถาดคือ **3/4** ครับ!", visual: "3/4 (เหลือ 3 ส่วนจาก 4)" },
        { text: "🎓 **คู่มือสำหรับผู้ปกครอง (Parent Guide):**<br><br>• **เป้าหมาย**: พัฒนาความรู้สึกเชิงจำนวนเกี่ยวกับเศษส่วนที่ไม่ได้เริ่มจากตัวเลขดิบ<br>• **วิธีสอน**: นำผลไม้ เช่น ส้มหรือขนมปัง มาผ่าแบ่งครึ่ง (1/2) หรือแบ่งเป็น 4 ชิ้น (1/4) ชี้ให้ดูความเท่ากันของแต่ละชิ้นก่อนเขียนสัญลักษณ์<br>• **ข้อพึงระวัง**: เด็กมักสับสนนึกว่าเศษส่วนที่ตัวส่วนมีค่ามากจะมีขนาดใหญ่กว่า (เช่น คิดว่า 1/4 ใหญ่กว่า 1/2) ซึ่งความจริงยิ่งหารเยอะ ขนาดชิ้นจะยิ่งเล็กลงครับ", visual: "👨‍👩‍👧‍👦 Parent Tip" }
      ],
      postTest: [
        { question: "What is 2/4 in simplest term? (2/4 มีค่าเท่ากับข้อใด?)", visual: "2/4 🍕", options: ["1/2", "1/3", "1/4"], answer: "1/2", explanation: "2 ส่วนจาก 4 ส่วน ก็คือครึ่งถาดพอดี หรือเขียนในรูปอย่างต่ำคือ 1/2 ครับ!" },
        { question: "Which fraction represent '1 slice chosen from 3'? (แบ่ง 3 เลือก 1)", visual: "🍰", options: ["1/3", "2/3", "3/1"], answer: "1/3", explanation: "ตัวเศษคือ 1 ตัวส่วนคือ 3 เขียนในรูปสัญลักษณ์เศษส่วนได้เป็น 1/3 ครับ!" },
        { question: "Which is larger: 1/2 or 1/3?", options: ["1/2", "1/3", "Equal"], answer: "1/2", explanation: "การแบ่งของออกเป็น 2 ชิ้น จะได้ชิ้นใหญ่กว่าการแบ่งเป็น 3 ชิ้นเสมอ ดังนั้น 1/2 > 1/3 ครับ!" },
        { question: "What is the denominator of 3/5? (ตัวส่วนของ 3/5 คือเลขใด?)", options: ["3", "5", "8"], answer: "5", explanation: "ตัวด้านล่างเรียกว่า ตัวส่วน (Denominator) ซึ่งก็คือเลข 5 ครับ!" },
        { question: "What is the numerator of 2/3? (ตัวเศษของ 2/3 คือเลขใด?)", options: ["2", "3", "1"], answer: "2", explanation: "ตัวเลขที่อยู่ด้านบนเรียกว่า ตัวเศษ (Numerator) ซึ่งก็คือเลข 2 ครับ!" }
      ]
    }
  ],
  "level-p4": [
    {
      id: "p4_les_decimal",
      title: "Math Ch.1: Decimals 101 🪙 (ทศนิยมเบื้องต้น)",
      subject: "Mathematics",
      badgeId: "badge_p4_decimal",
      badgeName: "Decimal Explorer",
      badgeEmoji: "🔎",
      slides: [
        { text: "สวัสดีครับพี่ๆ ป.4 บทเรียนวันนี้คือ **ทศนิยม (Decimals)** ครับ!<br><br>ทศนิยมเป็นการเขียนตัวเลขอีกรูปแบบหนึ่งนอกจากเศษส่วน เพื่อแสดงปริมาณที่น้อยกว่า 1 หน่วย เช่น เหรียญเงิน 0.5 บาท หรือ ความยาว 1.5 เซนติเมตร", visual: "0.5 ➔ 1/2" },
        { text: "การอ่านและแบ่งตำแหน่งทศนิยม:<br>• **จุดทศนิยม**: แบ่งส่วนจำนวนเต็มด้านซ้าย และส่วนทศนิยมด้านขวา<br>• **ตำแหน่งที่ 1**: ตัวเลขแรกหลังจุด หมายถึงหารด้วย 10 (ส่วนสิบ)<br>• **ตำแหน่งที่ 2**: ตัวเลขที่สองหลังจุด หมายถึงหารด้วย 100 (ส่วนร้อย)<br><br>เช่น **0.75** อ่านว่า ศูนย์-จุด-เจ็ด-ห้า หมายถึง 75 ส่วนใน 100 ส่วนครับ!", visual: "0.75 ➔ 75/100" },
        { text: "🎓 **คู่มือสำหรับผู้ปกครอง (Parent Guide):**<br><br>• **เป้าหมาย**: ลิงก์เรื่องทศนิยมกับสิ่งของรอบตัวและเปรียบเทียบค่าความต่างทศนิยมได้ถูกต้อง<br>• **วิธีสอน**: ใช้เหรียญสลึง (0.25 บาท) เหรียญห้าสิบสตางค์ (0.50 บาท) มาประกอบการคิดเงิน เพื่อชี้ให้เห็นว่าทศนิยมประกอบรวมเป็นจำนวนเต็มได้<br>• **ข้อระวัง**: เด็กมักคิดว่าทศนิยมหลายหลักมีค่ามากกว่าเสมอ เช่น คิดว่า 0.45 มากกว่า 0.5 (ความจริง 0.5 = 0.50 ซึ่งมากกว่า 0.45)", visual: "👨‍👩‍👧‍👦 Parent Tip" }
      ],
      postTest: [
        { question: "Convert 3/10 into decimal: (แปลง 3/10 เป็นทศนิยม)", visual: "3/10", options: ["0.3", "0.03", "3.0"], answer: "0.3", explanation: "ส่วนสิบคือทศนิยม 1 ตำแหน่ง นำ 3 วางหลังจุดได้เป็น 0.3 ครับ!" },
        { question: "Convert 75/100 into decimal: (แปลง 75/100 เป็นทศนิยม)", visual: "75/100", options: ["0.75", "7.5", "0.075"], answer: "0.75", explanation: "ส่วนร้อยคือทศนิยม 2 ตำแหน่ง นำ 75 วางหลังจุดได้เป็น 0.75 ครับ!" },
        { question: "Which is smaller: 0.28 or 0.3?", visual: "0.28 vs 0.30", options: ["0.28", "0.3", "Equal"], answer: "0.28", explanation: "0.3 มีค่าเท่ากับ 0.30 ➔ เมื่อเปรียบหลักส่วนสิบ เลข 2 ใน 0.28 น้อยกว่าเลข 3 ใน 0.30 ตอบ 0.28 ครับ!" },
        { question: "What is 1.5 + 2.3 = ?", visual: "1.5 + 2.3", options: ["3.5", "3.8", "4.0"], answer: "3.8", explanation: "บวกทีละหลัก: หลักทศนิยม (5 + 3 = 8) หลักหน่วย (1 + 2 = 3) รวมเป็น 3.8 ครับ!" },
        { question: "What is 2.5 - 1.2 = ?", visual: "2.5 - 1.2", options: ["1.3", "1.5", "2.3"], answer: "1.3", explanation: "ลบตรงตำแหน่งหลัก: 5 - 2 = 3 หลังจุด และ 2 - 1 = 1 หน้าจุด ตอบ 1.3 ครับ!" }
      ]
    }
  ],
  "level-p5": [
    {
      id: "p5_les_volume",
      title: "Math Ch.1: Volume of Cuboids 📦 (ปริมาตรทรงสี่เหลี่ยม)",
      subject: "Mathematics",
      badgeId: "badge_p5_volume",
      badgeName: "Volume Architect",
      badgeEmoji: "📐",
      slides: [
        { text: "สวัสดีครับพี่ๆ ป.5! วันนี้เรามาคำนวณ **ปริมาตรของรูปทรงสี่เหลี่ยมมุมฉาก (Volume of Cuboids)** กันครับ<br><br>ปริมาตรคือความจุของกล่องสามมิติ ซึ่งคำนวณได้โดยการนำ กว้าง ยาว และสูงมาคูณกัน", visual: "Volume = W x L x H" },
        { text: "สูตรคำนวณอย่างเป็นทางการ:<br>📈 **ปริมาตร = กว้าง (Width) x ยาว (Length) x สูง (Height)**<br><br>เช่น กล่องพัสดุกว้าง 2 ซม., ยาว 5 ซม., สูง 3 ซม.<br>• ปริมาตร = 2 x 5 x 3<br>• คิดขั้นแรก: 2 x 5 = 10 ➔ คูณด้วยสูง: 10 x 3 = **30 ลูกบาศก์เซนติเมตร**!", visual: "2cm x 5cm x 3cm ➔ 30" },
        { text: "🎓 **คู่มือสำหรับผู้ปกครอง (Parent Guide):**<br><br>• **เป้าหมาย**: ทำความเข้าใจหน่วยลูกบาศก์และเรียนรู้การคำนวณความจุสามมิติในชีวิตจริง<br>• **วิธีสอน**: นำกล่องนมหรือกล่องของเล่นเปล่ามาชี้ชวนให้เด็กเห็นมิติทั้งสาม (กว้างด้านหน้า, ยาวด้านลึก, สูงด้านข้าง) และลองใช้ไม้บรรทัดวัดมาคำนวณจริง<br>• **ระวัง**: เด็กมักสับสนระหว่าง 'พื้นที่' (กว้าง x ยาว) และ 'ปริมาตร' (กว้าง x ยาว x สูง) เน้นย้ำมิติความสูงเสมอครับ", visual: "👨‍👩‍👧‍👦 Parent Tip" }
      ],
      postTest: [
        { question: "Find the volume of a box: w=2cm, l=4cm, h=5cm:", visual: "2 x 4 x 5", options: ["20 cubic cm", "40 cubic cm", "60 cubic cm"], answer: "40 cubic cm", explanation: "นำมิติตามสูตรมาคูณกัน: 2 x 4 x 5 = 8 x 5 = 40 ลูกบาศก์เซนติเมตรครับ!" },
        { question: "Find the volume of a cube with side length 3m: (ลูกบาศก์ยาวด้านละ 3 เมตร)", visual: "Cube 3 x 3 x 3", options: ["9 cubic m", "18 cubic m", "27 cubic m"], answer: "27 cubic m", explanation: "ลูกบาศก์มีความกว้าง ยาว สูงเท่ากันทั้งหมด ➔ 3 x 3 x 3 = 27 ลูกบาศก์เมตรครับ!" },
        { question: "If a box has volume 24 cubic cm, width 2cm, and length 3cm. What is its height?", visual: "Volume=24, w=2, l=3", options: ["3cm", "4cm", "5cm"], answer: "4cm", explanation: "ปริมาตร = กว้าง x ยาว x สูง ➔ 24 = 2 x 3 x สูง ➔ 24 = 6 x สูง ดังนั้น สูง = 24/6 = 4 ซม. ครับ!" },
        { question: "Find the volume of a pencil box: w=3cm, l=10cm, h=2cm:", visual: "3 x 10 x 2", options: ["30", "50", "60"], answer: "60", explanation: "ปริมาตร = 3 x 10 x 2 = 30 x 2 = 60 ลูกบาศก์เซนติเมตรครับ!" },
        { question: "Which unit is used for volume? (หน่วยใดใช้สำหรับวัดปริมาตร?)", options: ["Square meter (ตารางเมตร)", "Cubic meter (ลูกบาศก์เมตร)", "Meter (เมตร)"], answer: "Cubic meter (ลูกบาศก์เมตร)", explanation: "ปริมาตรเป็นสามมิติ วัดเป็นลูกบาศก์ (Cubic) ส่วนพื้นที่เป็นตาราง (Square) และความยาววัดเป็นเมตรปกติครับ!" }
      ]
    }
  ],
  "level-p6": [
    {
      id: "p6_les_gcd_lcm",
      title: "Math Ch.1: G.C.D. & L.C.M. 🧮 (ห.ร.ม. และ ค.ร.น. ปราบเซียน)",
      subject: "Mathematics",
      badgeId: "badge_p6_gcd_lcm",
      badgeName: "Math Champion",
      badgeEmoji: "🏆",
      slides: [
        { text: "สวัสดีครับน้องๆ ป.6! วันนี้มาพิชิต **ห.ร.ม. (G.C.D.)** และ **ค.ร.น. (L.C.M.)** กันนะครับ:<br><br>• **ห.ร.ม. (หารร่วมมาก)**: ตัวหารที่มากที่สุดที่ไปหารตัวเลขทุกตัวลงตัวพอดี ใช้แบ่งกลุ่มหรือแบ่งจัดของให้ลงตัวมากที่สุด<br>• **ค.ร.น. (คูณร่วมน้อย)**: ผลคูณร่วมที่น้อยที่สุดที่ตัวเลขทุกตัววิ่งไปหารมันได้ลงตัวพอดี ใช้หาจุดนัดพบเวลาหรือสัญญาณไฟสลับ", visual: "G.C.D. & L.C.M." },
        { text: "วิธีหาอย่างง่าย (เช่น เลข 8 และ 12):<br><br>• **หาร่วมมาก (ห.ร.ม.)**: ตัวหารของ 8 (1,2,4,8) และ 12 (1,2,3,4,6,12) ➔ หารร่วมคือ 1, 2, 4 มากที่สุดคือ **4**<br>• **คูณร่วมน้อย (ค.ร.น.)**: พหุคูณของ 8 (8, 16, 24, 32...) และ 12 (12, 24, 36...) ➔ คูณร่วมที่พบน้อยสุดคือ **24**!", visual: "G.C.D = 4 | L.C.M = 24" },
        { text: "🎓 **คู่มือสำหรับผู้ปกครอง (Parent Guide):**<br><br>• **เป้าหมาย**: พัฒนาความสามารถทางด้านพีชคณิตและการแยกตัวประกอบเพื่อต่อยอดระดับมัธยม<br>• **วิธีสอน**: อธิบาย ห.ร.ม. ผ่านการแบ่งเค้กหรือตัดแบ่งเชือกยาวไม่เท่ากันให้ได้ขนาดใหญ่ที่สุดเท่าๆ กันโดยไม่เหลือเศษ และอธิบาย ค.ร.น. ผ่านจังหวะเดินสองเท้าขนาดย่างต่างกันที่จะมาเหยียบทับกันรอบถัดไป<br>• **เทคนิคการเช็ค**: แนะนำให้ใช้วิธีตั้งหารสั้นเพื่อหาทั้ง ห.ร.ม และ ค.ร.น ไปพร้อมกันอย่างมีระเบียบ", visual: "👨‍👩‍👧‍👦 Parent Tip" }
      ],
      postTest: [
        { question: "Find the G.C.D (ห.ร.ม.) of 12 and 18:", visual: "G.C.D of 12 & 18", options: ["3", "6", "12"], answer: "6", explanation: "ตัวหารร่วมของ 12 และ 18 คือ 1, 2, 3, 6 มากที่สุดคือ 6 ครับ!" },
        { question: "Find the L.C.M (ค.ร.น.) of 6 and 8:", visual: "L.C.M of 6 & 8", options: ["12", "24", "48"], answer: "24", explanation: "คูณร่วมที่น้อยที่สุดของ 6 และ 8 คือ 24 (6 x 4 = 24 และ 8 x 3 = 24) ครับ!" },
        { question: "Find the G.C.D (ห.ร.ม.) of 10 and 25:", options: ["2", "5", "10"], answer: "5", explanation: "เลขมากสุดที่หารทั้ง 10 และ 25 ลงตัวพอดีคือ 5 ครับ!" },
        { question: "Find the L.C.M (ค.ร.น.) of 5 and 10:", options: ["5", "10", "15"], answer: "10", explanation: "เนื่องจาก 10 หารด้วย 5 ลงตัวอยู่แล้ว พหุคูณร่วมที่น้อยสุดของทั้งสองจึงเท่ากับ 10 ครับ!" },
        { question: "What is the G.C.D of two prime numbers? (ห.ร.ม. ของจำนวนเฉพาะสองตัวใดๆ คือข้อใด?)", options: ["1", "Their product (ผลคูณ)", "0"], answer: "1", explanation: "จำนวนเฉพาะไม่มีตัวหารร่วมอื่นนอกจาก 1 ดังนั้น ห.ร.ม. จึงมีค่าเป็น 1 เสมอครับ!" }
      ]
    }
  ]
};