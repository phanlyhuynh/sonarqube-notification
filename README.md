I. Setup project on Sonarqube
1. Generate token

II. Setup Github:

1. Add `Actions secrets and variables` on github:

```
SONAR_TOKEN
SONAR_HOST_URL
```

2. Add file `sonar-project.properties` to source code with content:
```
sonar.projectKey=
```


3. Add workflow `.github/workflows/scan-security.yml`:
```
name: Scan Security

on:
  schedule:
    - cron: '0 0 * * *'

jobs:
  build:
    name: Build
    runs-on: ubuntu-latest
    permissions: read-all
    steps:
      - uses: actions/checkout@v2
        with:
          fetch-depth: 0  # Shallow clones should be disabled for a better relevancy of analysis
      - name: Check value
        run: echo ${{ secrets.SONAR_TOKEN }}
      - uses: sonarsource/sonarqube-scan-action@master
        env:
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
          SONAR_HOST_URL: ${{ secrets.SONAR_HOST_URL }}
```
III. Setup on sonarqube notification tool
1. Add value for project
2. Add webhook link on sonarqube
