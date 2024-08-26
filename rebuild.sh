systemctl stop stirlingpdf.service;

./gradlew build;

cp -ap build/libs/Stirling-PDF-0.28.2.jar /opt/Stirling-PDF/;

systemctl start stirlingpdf.service;

systemctl status stirlingpdf.service;
