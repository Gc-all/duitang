<?php
    $textname = $_POST['textname'];
    $textpsw = $_POST['textpsw'];
    $textnick = $_POST['textnick'];
    $sql = "INSERT INTO `users` (`username`,`password`,`nickname`) VALUES ('$textname','$textpsw','$textnick')";
    // 2-2. 连接数据库
    $link = mysqli_connect('127.0.0.1', 'root', 'root', 'duitang');
    // 2-3. 执行 sql 语句
    $res = mysqli_query($link, $sql);
    // 2-5. 关闭连接
    mysqli_close($link);

    if(!$res){
        $arr = Array(
            "message" => "注册失败",
            "code" => 0
        );
    }else{
        $arr = Array(
            "message" => "注册成功",
            "code" => 1
        );
    };
    echo json_encode($arr);




    



?>