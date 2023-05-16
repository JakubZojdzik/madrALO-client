<script>
export default {};
</script>

<template>
    <main>
        <div class="wrapper">
            <h2>Zasady:</h2>
            <ul>
                <li>Zadania należy rozwiązywać samodzielnie</li>
                <li>Dozwolone jest korzystanie z internetu, komputerów, kalkulatorów itd.</li>
                <li>Zabronione jest udostępnianie rozwiązań lub odpowiedzi do zadań.</li>
                <li>Łamanie zasad skutkuje unieważnieniem uczestnictwa w konkursie</li>
                <li>Zalecane jest dołączenie do <a href="https://discord.gg/4HN93zecFm" target="_blank" rel="noopener noreferrer">discorda z ogłoszeniami</a> dotyczącymi konkursu</li>
                <li>Wszystkie pytania dotyczące zadań lub systemu konkursowego powinny być kierowane na discordzie do osób z rolą "organiator"</li>
            </ul>
            <h2>Nagrody:</h2>
            <ul>
                <li>
                    <span class="place1">Miejsce 1</span>:
                    <ul>
                        <li>Zwiedzanie <a href="https://pl.wikipedia.org/wiki/Bem_(superkomputer)" target="_blank" rel="noopener noreferrer">superkomputera Bem</a></li>
                        <li>Ocena celująca z matematyki</li>
                    </ul>
                </li>

                <li>
                    <span class="place2">Miejsce 2</span>:
                    <ul>
                        <li>Zwiedzanie <a href="https://pl.wikipedia.org/wiki/Bem_(superkomputer)" target="_blank" rel="noopener noreferrer">superkomputera Bem</a></li>
                        <li>Plus z matematyki</li>
                    </ul>
                </li>

                <li>
                    <span class="place3">Miejsce 3</span>:
                    <ul>
                        <li>Zwiedzanie <a href="https://pl.wikipedia.org/wiki/Bem_(superkomputer)" target="_blank" rel="noopener noreferrer">superkomputera Bem</a></li>
                        <li>Plus z matematyki</li>
                    </ul>
                </li>

                <li>
                    <span>Miejsca 4, 5, 6</span>
                    <ul>
                        <li>Plus z matematyki</li>
                    </ul>
                </li>
            </ul>

            <p>Zwiedzanie superkomputera jest możliwe dzięki życzliwości Wrocławskiego Centrum Sieciowo-Superkomputerowego</p>
            <h3>Zadania tworzyli:</h3>
            <ul>
                <li>Jakub Żojdzik</li>
                <li>Michał Węgrzyn</li>
                <li>Tymon Terczyński</li>
            </ul>

            <h3>Nad systemem konkursu pracowali:</h3>
            <ul>
                <li>Jakub Żojdzik:</li>
                <ul>
                    <li>Codebase</li>
                </ul>
                <li>Maciej Opaliński:</li>
                <ul>
                    <li>Code review</li>
                    <li>Konfiguracja serwera</li>
                </ul>
            </ul>

            <h3>Opiekun konkursu:</h3>
            <ul>
                <li>Sławomir Wójcik</li>
            </ul>
            <br />
            <p>
                Aplikacja na licencji MIT dostępna na githubie:
                <a href="https://github.com/JakubZojdzik/madrALO-client" target="_blank" rel="noopener noreferrer">Client</a>,
                <a href="https://github.com/JakubZojdzik/madrALO-api" target="_blank" rel="noopener noreferrer">API</a>
            </p>
        </div>
    </main>
</template>

<style scoped>
.wrapper {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    line-height: 3rem;
}

a {
    color: white;
}

p {
    line-height: 2rem;
}

span {
    font-weight: bold;
}

.place1 {
    color: #c9b037;
}

.place2 {
    color: #b4b4b4;
}

.place3 {
    color: #ad8a56;
}
</style>
