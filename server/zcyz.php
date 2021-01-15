<?php
    $textname = $_POST['textname'];
    $sql = "SELECT * FROM `users` WHERE `username`='$textname'";
    // 2-2. 连接数据库
    $link = mysqli_connect('127.0.0.1', 'root', 'root', 'duitang');
    // 2-3. 执行 sql 语句
    $res = mysqli_query($link, $sql);
    // 2-4. 解析结果
    $data = mysqli_fetch_all($res, MYSQLI_ASSOC);
    // 2-5. 关闭连接
    mysqli_close($link);

    if(count($data)){
        $arr = Array(
            "message" => "该用户名已经被注册了",
            "code" => 0
        );
    }else{
        $arr = Array(
            "message" => "可以注册",
            "code" => 1
        );
    }

    echo json_encode($arr);



?>