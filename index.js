class registerForm {
  constructor() {
    this.createElements();
    this.addElementsAttributes();
    this.render();
    this.attachEventHandlers();
  }
  createElements() {
    this.body = document.querySelector('body')
    this.mainDiv = document.createElement('div');
    this.formDiv = document.createElement('div');
    this.name = document.createElement('input');
    this.birthDate = document.createElement('input');
    this.genderMale = document.createElement('input');
    this.genderFemale = document.createElement('input');
    this.genderMaleLabel = document.createElement('label');
    this.genderFemaleLabel = document.createElement('label');
    this.genderMaleDiv = document.createElement('div');
    this.genderFemaleDiv = document.createElement('div');
    this.genderChoose = document.createElement('div');
    this.citySelector = document.createElement('select');
    this.defaultCityOption = document.createElement('option');
    this.address = document.createElement('input');
    this.languagesDiv = document.createElement('div');
    this.submitButton = document.createElement('button');
    this.buttonDiv = document.createElement('div');
  }
  addElementsAttributes() {
    this.mainDiv.classList.add('register-form');
    this.formDiv.classList.add('form');
    this.name.type = 'text';
    this.name.placeholder = 'Enter your full name';
    this.birthDate.type = 'text';
    this.birthDate.placeholder = 'Enter your birth date';
    this.genderMale.type = 'radio';
    this.genderFemale.type = 'radio';
    this.address.type = 'textarea';
    this.address.placeholder = 'Enter your address';
    this.languagesDiv.classList.add('languages-choose');
    this.genderMale.name = 'genderChoose';
    this.genderFemale.name = 'genderChoose';
    this.genderMale.value = 'Male';
    this.genderFemale.value = 'Female';
    this.genderMale.id = 'male';
    this.genderFemale.id = 'female';
    this.genderMaleLabel.setAttribute('for', 'male');
    this.genderFemaleLabel.setAttribute('for', 'female');
    this.genderMaleLabel.innerText = 'Male:';
    this.genderFemaleLabel.innerText = 'Female:';
    this.submitButton.type = 'button';
    this.submitButton.innerText = 'Submit';
    this.genderChoose.classList.add('gender-choose');
    this.defaultCityOption.value = '';
    this.defaultCityOption.disabled = true;
    this.defaultCityOption.selected = true;
    this.defaultCityOption.hidden = true;
    this.defaultCityOption.innerText = 'Chose your city';
    this.buttonDiv.classList.add('button-div');
  }
  render() {
    this.genderMaleDiv.append(this.genderMaleLabel);
    this.genderMaleDiv.append(this.genderMale);
    this.genderFemaleDiv.append(this.genderFemaleLabel);
    this.genderFemaleDiv.append(this.genderFemale);
    this.genderChoose.append(this.genderMaleDiv);
    this.genderChoose.append(this.genderFemaleDiv);
    this.formDiv.append(this.name);
    this.formDiv.append(this.birthDate);
    this.formDiv.append(this.genderChoose);
    this.formDiv.append(this.city());
    this.formDiv.append(this.address);
    this.formDiv.append(this.languages());
    this.buttonDiv.append(this.submitButton);
    this.formDiv.append(this.buttonDiv);
    this.mainDiv.append(this.formDiv);
    this.body.append(this.mainDiv);
  }
  attachEventHandlers() {
    this.submitButton.addEventListener('click', (e) => {
      this.selectedGender = document.getElementsByName('genderChoose');
      this.selectedLanguages = document.getElementsByName('checkboxLanguages');
      new TableWithDataFromUser(this.name.value, this.birthDate.value, this.selectedGender, this.citySelector.value, this.address.value, this.selectedLanguages);
    });
  }
  city() {
    const citys = ['Kharkiv', 'Kyiv', 'Mykolaiv'];
    this.citySelector.append(this.defaultCityOption);
    citys.forEach(city => {
      const option = document.createElement('option');
      option.value = city;
      option.innerText = city;
      this.citySelector.append(option);
    });
    return this.citySelector;
  }
  languages() {
    const languages = [ 'English', 'French', 'Spanish', 'German', 'Ukrainian', 'Italian', 'Russian', 'Chinese (Mandarin)', 'Japanese', 'Portuguese' ];
    languages.forEach(language => {
      const languageInput = document.createElement('input');
      const languageLable = document.createElement('lable');
      const languageDiv = document.createElement('div');
      languageInput.type = 'checkbox';
      languageInput.id = language.toLowerCase();
      languageInput.name = 'checkboxLanguages';
      languageInput.value = language;
      languageLable.setAttribute('for', language.toLowerCase());
      languageLable.innerText = language;
      languageDiv.append(languageLable);
      languageDiv.append(languageInput);
      this.languagesDiv.append(languageDiv);
    });
    return this.languagesDiv;
  }
}

class TableWithDataFromUser {
  constructor(name, birthDate, gender, city, address, languages) {
    this.name = name;
    this.birthDate = birthDate;
    this.gender = this.userChoice(gender);
    this.city = city;
    this.address = address;
    this.languages = this.userChoice(languages);
    this.identifyElements();
    this.createElements();
    this.addElementsAttributes();
    this.render();
  }
  userChoice(array) {
    return [...array].filter(item => item.checked).map(item => item.value);
  }
  createElements() {
    this.tableDiv = document.createElement('div');
    this.table = document.createElement('table');
  }
  addElementsAttributes() {
    this.tableDiv.classList.add('table');
  }
  render() {
    this.mainDiv.innerText = '';
    this.tableDiv.append(this.createTable());
    this.mainDiv.append(this.tableDiv);
  }
  createTable() {
    const tableValues = [
      {
        title: 'Name',
        value: this.name,
      },
      {
        title: 'Birth date',
        value: this.birthDate,
      },
      {
        title: 'Gender',
        value: this.gender.join(', '),
      },
      {
        title: 'City',
        value: this.city,
      },
      {
        title: 'Address',
        value: this.address,
      },
      {
        title: 'Languages',
        value: this.languages.join(', '),
      },
    ];
    tableValues.forEach(item => {
      const tr = document.createElement('tr');
      const tdTitle = document.createElement('td');
      const tdValue = document.createElement('td');
      tdTitle.innerText = item.title;
      tdValue.innerText = item.value;
      tr.append(tdTitle);
      tr.append(tdValue);
      this.table.append(tr);
    })
    return this.table;
  }
  identifyElements() {
    this.mainDiv = document.querySelector('.register-form')
  }
}

new registerForm();