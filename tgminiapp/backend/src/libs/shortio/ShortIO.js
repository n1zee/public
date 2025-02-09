class ShortIO {
  constructor(api_key) {
    this.api_key = api_key;
  }

  async folderCreate({
    name,
    domainId,
  }) {
    const url = 'https://api.short.io/links/folders';
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': this.api_key,
      },
      body: JSON.stringify({
        domainId,
        name,
      }),
    };
    return fetch(url, options)
      .then(res => res.json());
  }

  async domainList() {
    const url = 'https://api.short.io/api/domains?limit=100&offset=0';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: this.api_key,
      },
    };
    return fetch(url, options)
      .then(res => res.json());
  }

  async linkCreate({
    domain,
    folderId,
    originalURL,
    title,
  }) {
    const url = 'https://api.short.io/links';
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: this.api_key,
      },
      body: JSON.stringify({
        skipQS: false,
        archived: false,
        allowDuplicates: false,
        domain,
        folderId,
        originalURL,
        title,
      }),
    };
    return fetch(url, options)
      .then(res => res.json());
  }
}

module.exports = ShortIO;
