import LegalPageTemplate from '../components/LegalPageTemplate'

export default function TermsPage() {
  return (
    <LegalPageTemplate
      title="Regulamin"
      subtitle="Regulamin sklepu internetowego Odwsioka określa zasady korzystania z serwisu i składania zamówień."
      lastUpdated="19 czerwca 2026"
      sections={[
        {
          title: 'Postanowienia ogólne',
          paragraphs: [
            'Niniejszy regulamin określa zasady korzystania ze sklepu internetowego Odwsioka dostępnego pod adresem odwsioka.pl.',
            'Operatorem Sklepu jest Antoni Blonkowski, prowadzący działalność gospodarczą pod firmą BLONEKDEV, NIP: PL5711727874.',
            'Składając zamówienie, akceptujesz postanowienia niniejszego regulaminu.',
          ],
        },
        {
          title: 'Model działania Sklepu',
          paragraphs: [
            'Odwsioka działa jako sklep pośredniczący (dropshipping). Administrator jest właścicielem i operatorem serwisu odwsioka.pl, lecz nie jest producentem oferowanych produktów.',
            'Towary oferowane w Sklepie pochodzą od niezależnych producentów i gospodarstw, z którymi Administrator współpracuje na podstawie umów pośrednictwa sprzedaży. Aktualni partnerzy to m.in.:',
            '— Grodziskie Sery Rzemieślnicze Groser: grodziskiesery.pl',
            '— Miód Dobry: miod-dobry.pl',
            '— Mlecznie pod kasztanem: mleczniepodkasztanem.pl',
            'Certyfikaty, nagrody, szczegółowe informacje o składzie, alergenach oraz procesie produkcji poszczególnych produktów znajdują się na stronach internetowych odpowiednich producentów. Sklep prezentuje ofertę partnerów i pośredniczy w sprzedaży ich produktów.',
          ],
        },
        {
          title: 'Składanie zamówień',
          paragraphs: [
            'Zamówienia składane są przez formularz dostępny na stronie. Minimalna wartość zamówienia wynosi 50 zł.',
            'Po złożeniu zamówienia otrzymasz potwierdzenie na podany adres e-mail. Umowa sprzedaży zostaje zawarta w momencie potwierdzenia przyjęcia zamówienia przez Sklep.',
            'Realizacja dostawy następuje bezpośrednio od producenta-partnera, od którego pochodzi dany produkt. Sklep koordynuje proces zamówienia i kontakt z Klientem.',
          ],
        },
        {
          title: 'Ceny i płatności',
          paragraphs: [
            'Wszystkie ceny podane na stronie są cenami brutto w złotych polskich. Sklep zastrzega sobie prawo do zmiany cen produktów.',
            'Płatności obsługiwane są za pośrednictwem platformy Shopify. Dostępne formy płatności są wskazane w procesie składania zamówienia na stronie Shopify.',
          ],
        },
        {
          title: 'Dostawa',
          paragraphs: [
            'Produkty wysyłane są bezpośrednio od producentów-partnerów na adres wskazany w zamówieniu. Termin realizacji zależy od dostępności produktów u danego producenta oraz harmonogramu jego wysyłek.',
            'Ze względu na charakter produktów (świeże mleko, sery, miód) dostawa odbywa się w warunkach zapewniających odpowiednią jakość i bezpieczeństwo, zgodnie ze standardami stosowanymi przez producenta.',
          ],
        },
        {
          title: 'Reklamacje',
          paragraphs: [
            'Reklamacje dotyczące produktów lub realizacji zamówienia można zgłaszać mailowo na adres blon3kdev@gmail.com w ciągu 14 dni od otrzymania przesyłki. Sklep koordynuje rozpatrzenie reklamacji z odpowiednim producentem-partnerem.',
            'Szczegółowe zasady zwrotów i reklamacji opisuje Polityka zwrotów.',
          ],
        },
      ]}
    />
  )
}
