import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Linking, Switch } from "react-native";

export default function App() {
  const [lang, setLang] = useState("bg");
  const [dark, setDark] = useState(false);

  const t = {
    bg: {
      title: "Днешни адреси",
      maps: "Навигация",
      import: "Импорт на снимка",
      dark: "Тъмен режим"
    },
    de: {
      title: "Heutige Termine",
      maps: "Navigation",
      import: "Bild importieren",
      dark: "Dark Mode"
    }
  };

  const data = [
    {
      time: "08:00 - 09:00",
      address: "Am Kleesbrock 16",
      phone: "1755144424"
    },
    {
      time: "09:00 - 10:00",
      address: "Taunusstraße 4",
      phone: "0521331668"
    }
  ];

  const colors = dark
    ? {
        bg: "#111",
        card: "#1f1f1f",
        text: "#fff"
      }
    : {
        bg: "#f3f3f3",
        card: "#fff",
        text: "#111"
      };

  const openMaps = (address) => {
    const url =
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent(address);
    Linking.openURL(url);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg, padding: 20 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 20 }}>
        <Text style={{ color: colors.text, fontSize: 28, fontWeight: "bold" }}>
          {t[lang].title}
        </Text>

        <TouchableOpacity
          onPress={() => setLang(lang === "bg" ? "de" : "bg")}
          style={{
            backgroundColor: "#333",
            paddingHorizontal: 14,
            paddingVertical: 8,
            borderRadius: 20
          }}
        >
          <Text style={{ color: "#fff" }}>{lang.toUpperCase()}</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
        <Text style={{ color: colors.text, marginRight: 10 }}>{t[lang].dark}</Text>
        <Switch value={dark} onValueChange={setDark} />
      </View>

      {data.map((item, index) => (
        <View
          key={index}
          style={{
            backgroundColor: colors.card,
            padding: 20,
            borderRadius: 20,
            marginBottom: 15
          }}
        >
          <Text style={{ color: colors.text, fontSize: 18, fontWeight: "bold" }}>
            {item.time}
          </Text>

          <Text style={{ color: "#4a90e2", marginTop: 10 }}>
            {item.address}
          </Text>

          <Text style={{ color: colors.text, marginTop: 8 }}>
            ☎ {item.phone}
          </Text>

          <TouchableOpacity
            onPress={() => openMaps(item.address)}
            style={{
              backgroundColor: "#000",
              padding: 14,
              borderRadius: 16,
              marginTop: 14
            }}
          >
            <Text style={{ color: "#fff", textAlign: "center" }}>
              🚗 {t[lang].maps}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}
