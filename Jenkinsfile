def secrets = [
    [path: params.VAULT_PATH_SVC_ACCOUNT_EPHEMERAL, engineVersion: 1, secretValues: [
        [envVar: 'OC_LOGIN_TOKEN_DEV', vaultKey: 'oc-login-token-dev'],
        [envVar: 'OC_LOGIN_SERVER_DEV', vaultKey: 'oc-login-server-dev']]],
    [path: params.VAULT_PATH_QUAY_PUSH, engineVersion: 1, secretValues: [
        [envVar: 'QUAY_USER', vaultKey: 'user'],
        [envVar: 'QUAY_TOKEN', vaultKey: 'token']]],
    [path: params.VAULT_PATH_RHR_PULL, engineVersion: 1, secretValues: [
        [envVar: 'RH_REGISTRY_USER', vaultKey: 'user'],
        [envVar: 'RH_REGISTRY_TOKEN', vaultKey: 'token']]]
]

def configuration = [vaultUrl: params.VAULT_ADDRESS, vaultCredentialId: params.VAULT_CREDS_ID, engineVersion: 1]

pipeline {
    agent { label 'insights' }
    options {
        timestamps()
    }
    environment {
        // --------------------------------------------
        // Options that must be configured by app owner
        // --------------------------------------------
        APP_NAME="payload-tracker"
        COMPONENT_NAME="payload-tracker-frontend"
        IMAGE="quay.io/cloudservices/payload-tracker-frontend"
    }
    stages {
        stage('Pipeline') {
            parallel {
                stage('Build the PR commit image') {
                    steps {
                        withVault([configuration: configuration, vaultSecrets: secrets]) {
                            sh './build_deploy.sh'
                        }

                        sh 'mkdir -p artifacts'
                    }
                }

                stage('Run Linter') {
                    steps {
                        withVault([configuration: configuration, vaultSecrets: secrets]) {
                            sh './lint.sh'
                        }
                    }
                }
            }
        }
    }
}
