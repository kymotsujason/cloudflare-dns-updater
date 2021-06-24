# Cloudflare Zones DNS Updater

A simple NodeJS script that checks and updates the IPs for each DNS in the Zones. Intended for home users where every zone's DNS has the same IP. Feel free to modify it for your use case (ie. different DNS types, multi-IP configs, etc).

## Getting Started

These instructions will get you a copy of the project up and running.

### Prerequisites

What things you need to utilize this project and how to install them

```
NodeJS
Cloudflare Account
CloudFlare API Token
```

### Installing

A step by step series of examples that tell you how to get a development env running


```
1. Clone the repo
2. npm install
3. Create a .env file and create the AUTH variable with your API key (without the Bearer part)
4. Run with your favorite process manager (I use PM2)
```



## Running the tests

N/A, this is too simple

## Deployment

Same as installation, it can run in a development and production environment.

## Built With

* [NodeJS](https://nodejs.org/en/) - The runtime environment being used

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

None, shouldn't need any.

## Authors

* **Jason Yue** - *Initial work* - [kymotsujason](https://github.com/kymotsujason)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Cloudflare for their amazing API
* Telus for changing my public IP whenever my router restarts, which is why I made this

