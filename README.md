# cs320-org-chart

## Setting up the flask application

* Make sure python 3.8 is installed, and figure out your python 3.8 command.
* Navigate to backend/ and run "{pythoncommand} -m venv .venv". If this fails, you may need to install venv.
* Activate the virtual environment
    - cmd.exe: C:\> .venv\Scripts\activate.bat
    - PowerShell (windows): PS C:\> .venv\Scripts\Activate.ps1
    - bash/zsh: $ source .venv/bin/activate
    - other shells: see https://docs.python.org/3/library/venv.html
* ensure that you are in the venv (should have venv in front of your shell prompt)
* run "python -m pip install -r requirements.txt
* Install mongodb and make sure mongod is running.
* navigate to mongodbStuff
* run "{pythoncommand} importJSON.py" to initialize the database
* If you are in a unix, run "./run.sh". If you're on windows, run "run.bat". If that doesn't work either fix it or let slack know, it's untested.
* The app should launch on **localhost:5000**



## Setting up frontend

* In the app directory in frontend, add a file ".env" and add the line "SKIP_PREFLIGHT_CHECK=true"
* "yarn install" in the cs320-org-chart directory, and in the frontend dir, and in the app directory
* In the app dir do: "yarn add @unicef/react-org-chart" and then in this same directory run "yarn start"
* without quotes


