const NEEDS_MATCH = "NEEDS_MATCH";
const LOSES = "LOSES";
const WINS = "WINS";
const history = [];

const Person = function(name, linkedin) {
  const id = btoa(name);
  const wonAgainst = [];
  let score = 0;

  const matchAgainst = function(otherPerson) {
    if (this.id == otherPerson.id) {
        return "WHAT?";
    }

    const loses = otherPerson.hasWon(this);
    if (loses) {
        return LOSES;
    }

    const wins = this.hasWon(otherPerson);
    if (wins) {
        return WINS;
    }
    
    return NEEDS_MATCH;
  }

 function hasWon(person) {
    if (person.id == this.id) {
        return true;
    }

    const hasWonAgainstPerson = this.wonAgainst.some(loser => {
        return loser.hasWon(person);
    });

    return hasWonAgainstPerson;
 }

  return {
    name: name,
    id: id,
    linkedin: linkedin,
    score: score,
    wonAgainst: wonAgainst,
    hasWon: hasWon,
    matchAgainst: matchAgainst,
  }
}

const people = [
  new Person("Elemar Jr.", "https://www.linkedin.com/in/elemarjr/"),
  new Person("Geraldo", "https://www.linkedin.com/in/exageraldo/"),
  new Person("Fernando Ambev", "https://www.linkedin.com/in/fcelarino/"),
  new Person("Mano Deyvin", "https://www.linkedin.com/company/chorume/"),
  new Person("Loiane", "https://www.linkedin.com/in/loiane/"),
  new Person("Guilherme Gopher Con", "https://www.linkedin.com/in/guilhermebr/"),
  new Person("Tais Mafioleti", "https://www.linkedin.com/in/ta%C3%ADs-mafioleti"),
  new Person("Felipe Deschamps", "https://www.linkedin.com/in/filipedeschamps/"),
  new Person("Fábio Akita", "https://www.linkedin.com/in/akitaonrails/"),
  new Person("Soraia Novaes", "https://www.linkedin.com/in/soraianovaes/"),
  new Person("Eduardo Pires", "https://www.linkedin.com/in/pireseduardo/"),
  new Person("Klaus", "https://www.linkedin.com/in/klaus-wuestefeld/"),
  new Person("Kalecser", "https://www.linkedin.com/in/kalecserp/"),
  new Person("Tania Raquel", "https://www.linkedin.com/in/taniastormovski/"),
  new Person("Thaisa Valdez", "https://www.linkedin.com/in/thaisavaldez/"),
  new Person("Jônatas Paganini", "https://www.linkedin.com/in/jonatasdp/"),
  new Person("Lucas Viecelli", "https://www.linkedin.com/in/lucasviecelli/"),
  new Person("Ana Medrado", "https://www.linkedin.com/in/anamedrado/"),
  new Person("Pachi Codes", "https://www.linkedin.com/in/pachicodes/"),
  new Person("Ana B Neri", "https://www.linkedin.com/in/ananeridev"),
  new Person("Gui Santos", "https://www.linkedin.com/in/guilherme-dos-santos/"),
];

const matches = (function() {
        const matches = [];
        for(let i=0;i<people.length;i++) {
            for(let j=i;j<people.length;j++) {
              const first = people[i];
              const second = people[j];
    
              if (first.id == second.id) {
                continue;
              }
    
              matches.push({first: first, second: second});
            }
        }

        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }
    
        return shuffleArray(matches);
    }
)();

let currentMatch = null;

function startDuel() {
    history.push(currentMatch);
    currentMatch = matches.shift();

    if (currentMatch == null) {
       displayWinner();
    } else {
        nextRound();
    }
}

function nextRound() {
    const firstPerson = currentMatch.first;
    const secondPerson = currentMatch.second;
    const result = firstPerson.matchAgainst(secondPerson);

    if (result == LOSES) {
        chooseWinner(2);
    }

    if (result == WINS) {
        chooseWinner(1);
    }

    if (result == NEEDS_MATCH) {
        displayRound();
    }
}

function displayRound() {
    const person1 = document.getElementById('person1');
    const person2 = document.getElementById('person2');

    const person1Linkedin = document.getElementById('person1Linkedin');
    const person2Linkedin = document.getElementById('person2Linkedin');

    person1.innerText = currentMatch.first.name;
    person2.innerText = currentMatch.second.name;

    person1Linkedin.href = currentMatch.first.linkedin;
    person2Linkedin.href = currentMatch.second.linkedin;

    document.getElementById('duel').style.display = 'block';
    document.getElementById('winner').style.display = 'none';
}

function chooseWinner(winnerIndex) {
    const winner = winnerIndex == 1 ? currentMatch.first : currentMatch.second;
    const loser = winnerIndex == 2 ? currentMatch.first : currentMatch.second;

    winner.score++;
    winner.wonAgainst.push(loser);
    startDuel();
}


function displayWinner() {
    const votingOrder = document.getElementById('votingOrder');
    document.getElementById('winner').style.display = 'block';

    people.forEach(person => {
        const tr = document.createElement('tr');
        const tdName = document.createElement('td');
        const tdVotes = document.createElement('td');
        tdName.innerText = `${person.name}`;
        tdVotes.innerText = `${person.score}`;
        votingOrder.appendChild(tr);
        tr.appendChild(tdName);
        tr.appendChild(tdVotes);
    });

    document.getElementById('duel').style.display = 'none';
}

startDuel();
