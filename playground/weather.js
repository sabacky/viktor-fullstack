const ziskejSouradnice = async (mesto) => {
    try {
        const odpoved = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(mesto)}&language=cs&format=json&count=1`);
        if (!odpoved.ok) throw new Error('Nepodařilo se najít lokaci');
        const data = await odpoved.json();
        const zaznam = data.results?.[0];
        if (!zaznam) throw new Error('Město nenalezeno');
        return { sirka: zaznam.latitude, delka: zaznam.longitude, nazev: zaznam.name };
    } catch (chyba) {
        alert(chyba.message);
        return undefined;
    }
};

const ziskejPredpoved = async ({ sirka, delka }) => {
    try {
        const odpoved = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${sirka}&longitude=${delka}&daily=temperature_2m_min,temperature_2m_max&forecast_days=1&timezone=auto`);
        if (!odpoved.ok) throw new Error('Nepodařilo se načíst předpověď');
        const data = await odpoved.json();
        const minimum = data.daily?.temperature_2m_min?.[0];
        const maximum = data.daily?.temperature_2m_max?.[0];
        const jednotka = data.daily_units?.temperature_2m_max || '°C';
        if (typeof minimum !== 'number' || typeof maximum !== 'number') throw new Error('Chybí data o teplotách');
        return { minimum, maximum, jednotka };
    } catch (chyba) {
        alert(chyba.message);
        return undefined;
    }
};

document.getElementById('formular').addEventListener('submit', async (e) => {
    e.preventDefault();
    const vstupniMesta = document.getElementById('mesta').value.split(/[,;]/);

    if (vstupniMesta.length === 0) {
        document.getElementById('output').textContent = 'Zadejte alespoň jedno město.';
        return;
    }

    if (vstupniMesta.length > 3) {
        document.getElementById('output').textContent = 'Lze zadat maximálně 3 města (beru první tři).';
        vstupniMesta.length = 3;
    }

    const vysledky = await Promise.allSettled(
        vstupniMesta.map(async (mesto) => {
            const lokace = await ziskejSouradnice(mesto);
            if (!lokace) return { mesto, chyba: 'Nenalezeno' };

            const predpoved = await ziskejPredpoved({ sirka: lokace.sirka, delka: lokace.delka });
            if (!predpoved) return { mesto: lokace.nazev, chyba: 'Chyba předpovědi' };

            return {
                mesto: lokace.nazev,
                teplota_min: predpoved.minimum,
                teplota_max: predpoved.maximum,
                jednotka: predpoved.jednotka
            };
        })
    );

    document.getElementById('output').innerHTML = vysledky
        .map(v => JSON.stringify(v.value))
        .join('<br>');
    document.getElementById('mesta').value = '';

//    console.log("Finále:", {
//        mesto: lokace.nazev,
//        teplota_min: predpoved.minimum,
//        teplota_max: predpoved.maximum,
//        jednotka: predpoved.jednotka
//    });
});
