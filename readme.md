French Culture API Client
Ce projet est une bibliothèque cliente pour l'API de data.culture.gouv.fr, permettant de rechercher des informations sur les festivals en France.

Installation
Pour installer cette bibliothèque, vous pouvez la cloner directement depuis le dépôt GitHub et exécuter npm install pour installer les dépendances requises.

```bash
git clone https://github.com/<your-username>/french-culture-api-client.git
cd french-culture-api-client
npm install
```

Utilisation
Cette bibliothèque expose plusieurs méthodes pour interroger l'API de data.culture.gouv.fr :

searchByQuery(query: string): Effectue une recherche par mot clé.
searchByRegion(region: string): Effectue une recherche par région.
searchByDomaine(domaine: string): Effectue une recherche par domaine.
searchByComplementDomaine(complement_domaine: string): Effectue une recherche par complément de domaine.
searchByDepartement(departement: string): Effectue une recherche par département.
searchByMoisHabituelDeDebut(mois_habituel_de_debut: string): Effectue une recherche par mois habituel de début.
search(params: SearchParams): Effectue une recherche avec tous les paramètres possibles.

Exemples
Voici comment vous pouvez utiliser cette bibliothèque pour effectuer une recherche par mot clé :

```javascript
Copy code
import { searchByQuery } from 'french-culture-api-client';

async function searchFestivals() {
    const results = await searchByQuery('jazz');
    console.log(results);
}

searchFestivals();
```

Contribuer
Les contributions à ce projet sont les bienvenues ! N'hésitez pas à ouvrir une issue ou à soumettre une pull request.

Licence
Ce projet est sous licence MIT.