[![Build Status](https://travis-ci.org/javallone/regexper.png)](https://travis-ci.org/javallone/regexper)

# Regexper

Code for the http://www.regexper.com/ site.

## This Fork
This fork was modified by Iftah Haimovitch. It has additional two (very cool) features:
* real time client side parsing of the regular expression! No Ruby and no server side processing is needed.
* highlighting sections of the regexp by hovering the mouse over the diagram

To run the website go to `regexper/app`  and run static file serving (eg. `python -m SimpleHTTPServer 8080`) and then open the browser to http://127.0.0.1:8080/public/

## Contributing

I greatly appreciate any contributions that you may have for the site. Feel free to fork the project and work on any of the reported issues, or let me know about any improvements you think would be beneficial.

When sending pull requests, please keep them focused on a single issue. I would rather deal with a dozen pull requests for a dozen issues with one change each over one pull request fixing a dozen issues. Also, I appreciate tests to be included with feature development, but for minor changes I will probably not put up much of a fuss if they're missing.

### Working with the code

While it is not necessary, I recommend using RVM for managing your ruby environment. A project .rvmrc file is provided in the repo which will switch to ruby-1.9.3-p194 and use a gemset called "regexper" to avoid polluting your global gems.

Once your environment is ready (either by using RVM or setup manually), you can install necessary requirements using bundler:

    bundle install

And run the server locally using foreman (it will be accessible at http://localhost:5000/ by default):

    foreman start

It is also recommended to run guard while developing to ensure tests continue passing:

    bundle exec guard

## License

This work is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License. See http://creativecommons.org/licenses/by-nc-sa/3.0/ for full license.
