<?php
require_once 'Classes/bancoDeDados.php';

router_add('index', function () {
    require_once 'includes/head.php';

    ?>
    <script>
        function pesquisar_todos() {
            system.request.post('/dashboard.php', { 'rota': 'pesquisa' }, function (retorno) {
                console.log(retorno);
            });
        }
    </script>
     <div class="main-panel">
        <div class="content-wrapper">
          <div class="row">
            <div class="col-lg-12 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title">Basic Table</h4>
                  <p class="card-description">
                    Add class <code>.table</code>
                    <button class="btn btn-primary btn-rounded btn-fw" onclick="pesquisar_todos();">BOTAO</button>
                  </p>
                </div>
              </div>
            </div>
          </div>

    <script>
        window.onload = function () {
            pesquisar_todos();
        }
    </script>
    <?php

    require_once 'includes/footer.php';
    exit;
});

router_add('pesquisa', function () {

    echo json_encode((array) [0 => ['nome' => 'rodoflo', 'telefone' => '17'], 1 => ['nome' => 'rororor', 'telefone' => 'rorororo3333']], JSON_UNESCAPED_UNICODE);
});

?>