// 

#!/usr/bin/env groovy
@Library("taranis-jenkins-library")_
abortOlderBuilds();


def environmentOptions = getNamespaceDeploymentOptions().reverse();
def previewLinkNamespace = "";
def namespace = "";
def gcrRepository = "us-central1-docker.pkg.dev/taranis-api/taranis/"
// This pipeline allows the hybrid mode of deploying to production in our legacy way, and also to an environment with the new scripts.
// Once we finish moving Production to the new environments scripts - we will remove all legacy code.
if (!BRANCH_NAME.toLowerCase().startsWith("pr-")) {  
    properties([
        disableConcurrentBuilds(),
        parameters([
            choice(name: "DEPLOY_TO_NAMESPACE", choices: environmentOptions.join("\n"), description: "To which namespace should the environment be deployed to?"),
        ]),
    ]);
    namespace = params.DEPLOY_TO_NAMESPACE;
}
else{
    properties([
        disableConcurrentBuilds(),
    ]);
}
podTemplate(label: "helm3GcloudPod", containers: [
        containerTemplate(name: "docker", image: "docker", ttyEnabled: true, command: "cat"),
        containerTemplate(name: "kubectl", image: "lachlanevenson/k8s-kubectl:latest", command: "cat", ttyEnabled: true),
        containerTemplate(name: "gcloud", image: "google/cloud-sdk", command: "cat", ttyEnabled: true),
        containerTemplate(name: "helm", image: "lachlanevenson/k8s-helm:v3.2.4", command: "cat", ttyEnabled: true)
], volumes: [
        hostPathVolume(mountPath: "/var/run/docker.sock", hostPath: "/var/run/docker.sock"),
]) {
    node("helm3GcloudPod") {
        def deploymentName = "conservation-frontend";
        def deployToClusters = ['taranis-api-us-east-4'];

        // Delete any frontend environment from the cluster which was merged to master
        def deletedBranches = getDeletedBranchesAndRemoveJobs("conservation-frontend");
        def deleteionTargetNamespaces = deletedBranches.collect{ fixHelmNamespaceName(it + "-conservation-frontend") }
        previewLinkNamespace = fixHelmNamespaceName(BRANCH_NAME + '-conservation-frontend');
        stageKubernetesDeleteNamespaces(Clusters.CLUSTER_QA_API, deleteionTargetNamespaces);

        def isProductionDeployment = namespace == Clusters.NAMESPACE_PRODUCTION; 
        def (dockerRepository, dockerTag, commitId, authorName, authorEmail, commiterName, commiterEmail, commitMessage, gitUrl) = stageCloneRepository(deploymentName, BRANCH_NAME, true);
        buildImageTag = dockerTag + ".build";
        stageBuildDockerImage(dockerRepository, buildImageTag, "Dockerfile", "build");
        stagePushGcrDockerImageSingleRegion(
            dockerRepository: dockerRepository, 
            dockerTag: buildImageTag,
            targetBuildStage: "build");

        buildImageCacheName = gcrRepository + deploymentName + ":" + buildImageTag;
 
        }

        // Copy the application dist folder to the nginx base, for serving
        servingImageTag = dockerTag + ".serving";
        stageBuildDockerImage(dockerRepository, servingImageTag, "Dockerfile", "serving", [buildImageCacheName, cypressImageName]);
        stagePushGcrDockerImageSingleRegion(
            dockerRepository: dockerRepository, 
            dockerTag: servingImageTag,
            targetBuildStage: "serving"
        )
        if (BRANCH_NAME.toLowerCase().startsWith("pr-") || BRANCH_NAME.toLowerCase() == "develop") {
            stage("Deploying Preview Link") {
                def develop = false;
                if(BRANCH_NAME.toLowerCase() == "develop"){
                    develop = true;
                }
                startFrontendEnvironmentDeploymentJob(servingImageTag, previewLinkNamespace, develop, true)
                container("gcloud"){
                    waitForArgocdApplication(previewLinkNamespace);
                }
                print("Your frontend preview link is ready at: https://${previewLinkNamespace}.envs.taranis.ag");
            }
        }
        
        if (!BRANCH_NAME.toLowerCase().startsWith("pr-")) {  
            deployToEnvironment(
                deploymentName: deploymentName,
                deployToClusters: deployToClusters,
                namespace: namespace,
                dockerRepository: dockerRepository,
                dockerTag: servingImageTag,
                legacyChartName: "helm",
                platform: "conservation"
            );
        }

    }
