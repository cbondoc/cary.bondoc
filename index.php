<html>
    <head>
        <title>Forum - Home Page</title>
        <link rel="stylesheet" type="text/css" href="css/bootstrap.css">
        <link rel="stylesheet" href="css/animations.css">
        <link rel="stylesheet" href="css/main_styles.css">

    </head>
    <body>
        <?php require 'navbar.php'; ?>

        <div class="container">
            <div class="row">
                <div class="col-md-6 col-lg-6">
                    <div class="grow visible-lg text-success">
                        <img src="images/quickitchen.jpg" />
                    </div>
                </div>
                <div class="col-md-6 col-lg-6">
                    <div class="visible-lg text-success">
                        <img src="images/quickitchen.jpg" width="450" height="450"/>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-6 col-lg-6">
                    <div class="visible-lg text-success">Large Devices!</div>
                    <div class="visible-md text-warning">Medium Devices!</div>
                    <div class="visible-xs visible-sm text-danger">Extra Small and Small Devices</div>
                </div>    
                <div class="col-md-6 col-lg-6">
                    <div class="visible-lg text-success">Large Devices!</div>
                    <div class="visible-md text-warning">Medium Devices!</div>
                    <div class="visible-xs visible-sm text-danger">Extra Small and Small Devices</div>
                </div>
            </div>
        </div>

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
        <script src="js/bootstrap.min.js"></script>

        <script>
            $('#animatedElement').click(function () {
                $(this).addClass("slideUp");
            });
        </script>
    </body>
</html>