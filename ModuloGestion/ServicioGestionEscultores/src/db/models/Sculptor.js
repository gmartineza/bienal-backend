class Sculptor {
  constructor(name, biography, contact, works) {
    this.name = name;
    this.biography = biography;
    this.contact = contact;
    this.works = works; // Obras previas
  }

  // Métodos setters
  setName(name) {
    this.name = name;
  }

  setBiography(biography) {
    this.biography = biography;
  }

  setContact(contact) {
    this.contact = contact;
  }

  setWorks(works) {
    this.works = works;
  }
}

module.exports = Sculptor;