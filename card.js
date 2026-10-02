"use strict";


/* ==================================================
   전화 걸기
================================================== */

function callPhone() {

    window.location.href = "tel:010-2828-2617";

}


/* ==================================================
   텍스트 복사
================================================== */

async function copyText(text) {

    try {

        if (
            navigator.clipboard &&
            window.isSecureContext
        ) {

            await navigator.clipboard.writeText(text);

        } else {

            const textarea =
                document.createElement("textarea");

            textarea.value = text;

            textarea.style.position = "fixed";
            textarea.style.left = "-9999px";
            textarea.style.top = "0";

            document.body.appendChild(textarea);

            textarea.focus();
            textarea.select();

            document.execCommand("copy");

            textarea.remove();

        }

        showToast("복사되었습니다.");

    } catch (error) {

        console.error(error);

        showToast("복사하지 못했습니다.");

    }

}


/* ==================================================
   명함 공유
================================================== */

async function shareCard() {

    const shareData = {

        title: "홈트릭스 | 권재용",

        text:
            "홈트릭스 대표 권재용의 모바일 명함입니다.",

        url:
            window.location.href

    };


    /*
        모바일 공유 기능 지원
    */

    if (navigator.share) {

        try {

            await navigator.share(shareData);

        } catch (error) {

            /*
                사용자가 공유창을 닫은 경우
                아무것도 하지 않음
            */

            if (
                error.name !== "AbortError"
            ) {

                console.error(error);

            }

        }

        return;
    }


    /*
        공유 기능이 없는 브라우저
        → 링크 복사
    */

    await copyText(window.location.href);

}


/* ==================================================
   Toast
================================================== */

let toastTimer = null;


function showToast(message) {

    const toast =
        document.getElementById("toast");

    if (!toast) {
        return;
    }


    toast.textContent = message;

    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer = setTimeout(
        function () {

            toast.classList.remove("show");

        },
        1800
    );

}