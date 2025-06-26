$(document).ready(() => {
    // window.addEventListener('beforeunload', function (event) {
    //     event.preventDefault(); // برای سازگاری با مرورگرهای قدیمی
    //     event.returnValue = 'آیا مطمئنید می‌خواهید صفحه را ترک کنید؟ داده‌های ذخیره‌نشده از بین خواهند رفت.'; // پیام نمایش داده شده
    // });
    // ==============
    // Local Variable
    var GameOverScore = 1165
    var GameSettingData = {}
    var firstGroup = {
        index: 1,
        name: 'ما',
        score: 0,
        player: {
            f_player: 'سجاد',
            s_player: 'الیا'
        }
    }
    var secondGroup = {
        index: 2,
        name: 'اونا',
        score: 0,
        player: {
            f_player: 'باقری',
            s_player: 'نجفی'
        }
    }
    var typeOfGame
    // -----------
    $("#new-game-btn").click(() => {
        $("#main-page").addClass("!hidden")
        $("#start-game-setting").removeClass("!hidden")
    })
    // ===================================================
    $("#back-to-main-page").click(() => {
        $("#start-game-setting").addClass("!hidden")
        $("#main-page").removeClass("!hidden")
    })
    // ==================================================
    // Game set
    $("#new-game-set-btn").click(() => {
        if ($("#new-game-set-menu").hasClass("opacity-0")) {
            $("#new-game-set-menu").removeClass("opacity-0")
            $("#new-game-set-menu").removeClass("!right-[-40%]")
            $("#unTransparentLayar").removeClass("!hidden")
            $("#thead").removeClass("sticky")
            $("#start-game-page").addClass("!overflow-hidden")
        }
        else {
            $("#new-game-set-menu").addClass("opacity-0")
            $("#new-game-set-menu").addClass("!right-[-40%]")
            $("#unTransparentLayar").addClass("!hidden")
            $("#thead").addClass("sticky")
            $("#start-game-page").removeClass("!overflow-hidden")
        }
    })
    $("#start-game-btn").click(() => {
        // $("#start-game-setting").addClass("!hidden")
        // $("#start-game-page").removeClass("!hidden")
        GameSetting()
        $("#th-firstGroupName").html(firstGroup.name)
        $("#th-secondGroupName").html(secondGroup.name)
    })
    // ===================================================================
    // window of game menu
    $("#exit-game-go-to-main-page").click(() => {
        window.location.reload()
        // $("#start-game-page").addClass("!hidden")
        // $("#main-page").removeClass("!hidden")
    })
    const GameSetting = () => {
        firstGroup.name = $("#first-group-name").val() != '' ? $("#first-group-name").val() : 'ما'
        firstGroup.player.f_player = $("#first-group-player-name").val() != '' ? $("#first-group-player-name").val() : 'الیا'
        firstGroup.player.s_player = $("#first-group-player2-name").val() != '' ? $("#first-group-player2-name").val() : 'سجاد'
        secondGroup.name = $("#second-group-name").val() != '' ? $("#second-group-name").val() : 'اونا'
        secondGroup.player.f_player = $("#second-group-player-name").val() != '' ? $("#second-group-player-name").val() : 'باقری'
        secondGroup.player.s_player = $("#second-group-player2-name").val() != '' ? $("#second-group-player2-name").val() : 'نجفی'
        typeOfGame = "withJoker";
        let withJoker = $("#withJoker")[0].checked
        let withOutJoker = $("#withOutJoker")[0].checked
        if (withJoker) {
            typeOfGame = "withJoker"
        }
        else if (withOutJoker) {
            typeOfGame = "withOutJoker"
        }
        if ($("#custom-score-input").val()) {
            GameOverScore = Number($("#custom-score-input").val())
        }
        GameSettingData = {
            firstGroup,
            secondGroup,
            typeOfGame,
            GameOverScore,
        }
        // ----------------------------------------------------------------------
        $("#start-game-setting").addClass("!hidden")
        $("#start-game-page").removeClass("!hidden")


    }
    const setValueOfGameOverScore = val => {
        GameOverScore = val ?? val
        $("#custom-score-input-div").addClass("!hidden")
        $("#custom-score-input").val('')
    }
    $("#towThousend").click(() => {
        setValueOfGameOverScore(Number($("#towThousend").val()))
    })
    $("#sixty").click(() => {
        setValueOfGameOverScore(Number($("#sixty").val()))
    })
    $("#thousend").click(() => {
        setValueOfGameOverScore(Number($("#thousend").val()))
    })
    $("#custom").click(() => {
        if ($("#custom-score-input-div").hasClass("!hidden")) {
            $("#custom-score-input-div").removeClass("!hidden")
        }
    })
    // ---------------------------------------------------------------------------------------------------------
    // Game Has been Started!
    // Local Variables
    var AllSets = []
    var whichGroupRead = null
    var whoRead = null
    var howMuchRead = null
    var otherSideScore = null
    var countOfSet = 0
    var didTheyGet = null
    let thisSet = {
        ev: 'set',
        dubblePostiveForOtherside: false,
        dubbleNegative: false,
        shelem: false,
        didTheyGet,
    }
    $("#new-set-btn").click(() => {
        $("#new-game-set-menu").addClass("!hidden")
        $("#new-game-set-menu").addClass("opacity-0")
        $("#new-game-set-menu").addClass("!right-[-40%]")
        $("#unTransparentLayar").addClass("!hidden")
        $("#thead").addClass("sticky")
        $("#start-game-page").removeClass("!overflow-hidden")
        $("#new-game-set").removeClass("!hidden")
        setTimeout(() => {
            $("#new-game-set-menu").removeClass("!hidden")
        }, 300)
        $("#fg-lable").html(firstGroup.name)
        $("#set-first-group-name").val(firstGroup.name)
        $("#sg-lable").html(secondGroup.name)
        $("#set-second-group-name").val(secondGroup.name)
    })
    $(".set_group_name").click(function () {
        let groupName = $(this).val()

        if (groupName == firstGroup.name) {
            whichGroupRead = firstGroup
            var players = `
            <div class="flex mx-4">
              <label class="mx-1" for="f_ply_name">${firstGroup.player.f_player}</label>
              <input class='set_player_name' value='${firstGroup.player.f_player}' type="radio" name="ply_name" id="f_ply_name">
            </div>
            <div class="flex mx-4">
              <label class="mx-1" for="s_ply_name">${firstGroup.player.s_player}</label>
              <input class='set_player_name' value='${firstGroup.player.s_player}' type="radio" name="ply_name" id="s_ply_name">
            </div>
            `
            $("#box-of-players-name").html(players)
        }
        if (groupName == secondGroup.name) {
            whichGroupRead = secondGroup
            var players = `
            <div class="flex mx-4">
              <label class="mx-1" for="f_ply_name">${secondGroup.player.f_player}</label>
              <input class='set_player_name' value='${secondGroup.player.f_player}' type="radio" name="ply_name" id="f_ply_name">
            </div>
            <div class="flex mx-4">
              <label class="mx-1" for="s_ply_name">${secondGroup.player.s_player}</label>
              <input class='set_player_name' value='${secondGroup.player.s_player}' type="radio" name="ply_name" id="s_ply_name">
            </div>
            `
            $("#box-of-players-name").html(players)
        }
        if (!whichGroupRead) {
            $("#error-alert-whichGroupRead").removeClass("!hidden")
        }
        else {
            $("#error-alert-whichGroupRead").addClass("!hidden")
            $("#dude-commited-name-div").removeClass("!hidden")
            $(".set_player_name").click(function () {
                let plyName = $(this).val()
                whoRead = plyName
                if (!whoRead) {
                    $("#error-alert-whoRead").removeClass("!hidden")
                }
                else {
                    $("#error-alert-whoRead").addClass("!hidden")
                }
            })
        }

    })
    $("#dubbleShelem").click(() => {
        howMuchRead = "dubbleShelem"
        if (newGameSettingValidator()) {
            $("#new-game-set").addClass("!hidden")
            if (whichGroupRead.index == 2) {
                $("#score-get-by-otherside").html(`امتیاز گرفته شده توسط ${firstGroup.name} : `)
            }
            else {
                $("#score-get-by-otherside").html(`امتیاز گرفته شده توسط ${secondGroup.name} : `)
            }
            $("#otherside-score-div").removeClass("!hidden")
        }

    })
    $("#Shelem").click(() => {
        howMuchRead = "shelem"
        if (newGameSettingValidator()) {
            $("#new-game-set").addClass("!hidden")
            if (whichGroupRead.index == 2) {
                $("#score-get-by-otherside").html(`امتیاز گرفته شده توسط ${firstGroup.name} : `)
            }
            else {
                $("#score-get-by-otherside").html(`امتیاز گرفته شده توسط ${secondGroup.name} : `)
            }
            $("#otherside-score-div").removeClass("!hidden")
        }

    })
    $("#read-score-input").keypress(() => {
        howMuchRead = Number($("#read-score-input").val())
        if (!howMuchRead) {
            $("#error-alert-readScore").removeClass("!hidden")
        }
        else {
            $("#error-alert-readScore").addClass("!hidden")
        }
    })
    $("#register-game").click(() => {
        howMuchRead = Number($("#read-score-input").val())
        if (newGameSettingValidator()) {
            if (whichGroupRead.index == 2) {
                $("#score-get-by-otherside").html(`امتیاز گرفته شده توسط ${firstGroup.name} : `)
            }
            else {
                $("#score-get-by-otherside").html(`امتیاز گرفته شده توسط ${secondGroup.name} : `)
            }
            $("#new-game-set").addClass("!hidden")
            $("#otherside-score-div").removeClass("!hidden")
        }

    })
    $("#otherside-score-btn").click(() => {
        otherSideScore = Number($("#otherside-score-input").val())
        if (otherSideScore == 0) {
            thisSet.shelem = true
        }
        if (otherSideScore > 100 && howMuchRead != "dubbleShelem" && howMuchRead != "shelem") {
            var confirmST = confirm("دوبل مثبت (ok) , دوبل منفی (cancel)")
            if (confirmST) {
                thisSet.dubblePostiveForOtherside = true
            }
            else {
                thisSet.dubbleNegative = true
            }
        }

        thisSet = {
            ...thisSet,
            whichGroupRead,
            howMuchRead,
            whoRead,
            otherSideScore,
        }
        AllSets.push(thisSet)
        $("#tbody").html('')
        AllSets.map((thisSet, index) => {
            if (thisSet.ev == 'set') {
                console.log("in the set top")

                AddToTableGameSet(thisSet, index + 1)
            }
            else if (thisSet.ev == 'cheat') {
                console.log("in the set bootm")
                AddToTabelCheat(thisSet)
            }
        })
        $("#otherside-score-div").addClass("!hidden")
        resetFormOfNewSet()
    })
    // ----------------------------------------------------
    // Reset Forms
    const resetFormOfNewSet = () => {
        $("#set-first-group-name")[0].checked = false
        $("#set-second-group-name")[0].checked = false
        $("#f_ply_name")[0].checked = false
        $("#s_ply_name")[0].checked = false
        $("#dude-commited-name-div").addClass("!hidden")
        $("#read-score-input").val('')
        $("#otherside-score-input").val('')
        whichGroupRead = null
        whoRead = null
        howMuchRead = null
        thisSet = {
            ev: 'set',
            dubblePostiveForOtherside: false,
            dubbleNegative: false,
            shelem: false,
            didTheyGet,
        }

    }

    // =========================================================
    // Cheating Methods
    var Cheating_options = {
        id: Math.floor(Math.random() * 1000),
        ev: `cheat`,
        amount: 0,
        to: null,
        signed: null,
    }
    $(".cheating_to").click(function () {
        Cheating_options.to = $(this).val()
    })
    $(".cheating_signed").click(function () {
        Cheating_options.signed = $(this).val()
    })
    $(".cheat-amout-radio").click(function () {
        Cheating_options.amount = Number($(this).val())
    })
    $("#register-cheating-btn").click(() => {
        let chAmountInput = Number($("#cheat-amout-input").val())
        if (chAmountInput) {
            Cheating_options.amount = chAmountInput
        }
        AllSets.push(Cheating_options)
        $("#tbody").html('')
        AllSets.map((thisSet, index) => {
            console.log(thisSet.ev)
            if (thisSet.ev == 'set') {
                AddToTableGameSet(thisSet, index + 1)
            }
            else if (thisSet.ev == 'cheat') {
                AddToTabelCheat(thisSet)
            }
        })
        $("#cheating-div").addClass("!hidden")
        resetCheatingForm()
    })
    $("#show-cheating-box-btn").click(() => {
        $("#new-game-set-menu").addClass("!hidden")
        $("#cheating-div").removeClass("!hidden")
        $("#new-game-set-menu").addClass("opacity-0")
        $("#new-game-set-menu").addClass("!right-[-40%]")
        $("#unTransparentLayar").addClass("!hidden")
        $("#thead").addClass("sticky")
        $("#start-game-page").removeClass("!overflow-hidden")
        setTimeout(() => {
            $("#new-game-set-menu").removeClass("!hidden")
        }, 300)
    })
    $("#cancel-cheat-btn").click(() => {
        $("#cheating-div").addClass("!hidden")
        resetCheatingForm()
    })
    // reset cheating form
    const resetCheatingForm = () => {
        $("#cheating_smal")[0].checked = false
        $("#cheating_big")[0].checked = false
        $("#cheat-amout-input").val('')
        $("#chaet_pos")[0].checked = false
        $("#cheat_neg")[0].checked = false
        $("#f_gr")[0].checked = false
        $("#s_gr")[0].checked = false
        Cheating_options = {
            ev: 'cheat',
            amount: 0,
            to: null,
            signed: null,
        }
    }
    // ===========================================================
    // Validators
    const newGameSettingValidator = () => {
        if (whichGroupRead && whoRead && howMuchRead) {
            if (howMuchRead <= 200 || howMuchRead == "shelem" || howMuchRead == "dubbleShelem") {
                return true
            }
            else {
                return false
            }
        }
        else {
            if (!whichGroupRead) {
                $("#error-alert-whichGroupRead").removeClass("!hidden")
            }
            else {
                $("#error-alert-whichGroupRead").addClass("!hidden")
            }
            if (!whoRead) {

                $("#error-alert-whoRead").removeClass("!hidden")
            }
            else {
                $("#error-alert-whoRead").addClass("!hidden")
            }
            if (!howMuchRead) {
                $("#error-alert-readScore").removeClass("!hidden")
            }
            else {
                $("#error-alert-readScore").addClass("!hidden")
            }
            return false
        }
    }
    const scoreGetbyOtherSideValidator = () => {
        if (otherSideScore == null) {
            $("#error-alert-otherSide-score").removeClass("!hidden")
            return false
        }
        else {
            if (otherSideScore > 200) {
                $("#error-alert-otherSide-score").removeClass("!hidden")
                return false
            }
            else {
                $("#error-alert-otherSide-score").addClass("!hidden")
                return true
            }

        }
    }
    // ==============================================================================
    // Add To Table Function
    const AddToTableGameSet = (thisSetT, setNumber) => {
        console.log("object")
        console.log(thisSetT)
        var firstGroupScoreForThisSet = 0
        var secondGroupScoreForThisSet = 0
        // =========================================================
        // First Group Logic
        if (thisSetT.whichGroupRead.index == 1) {
            if (thisSetT.shelem && thisSetT.howMuchRead != "dubbleShelem" && thisSetT.howMuchRead != "shelem") {
                firstGroupScoreForThisSet = thisSetT.howMuchRead * 2
                thisSetT.didTheyGet = true
            }
            // ---------------------------------------------------------
            else if (thisSetT.dubblePostiveForOtherside) {
                secondGroupScoreForThisSet = thisSetT.otherSideScore * 2
                firstGroupScoreForThisSet = -thisSetT.howMuchRead
                thisSetT.didTheyGet = false

            }
            // ---------------------------------------------------------
            else if (thisSetT.dubbleNegative) {
                firstGroupScoreForThisSet = thisSetT.howMuchRead * -2
                secondGroupScoreForThisSet = thisSetT.otherSideScore
                thisSetT.didTheyGet = false
            }
            // ---------------------------------------------------------
            // =========================================================
            else if (thisSetT.howMuchRead == "dubbleShelem") {
                if (thisSetT.otherSideScore > 0) {

                    firstGroupScoreForThisSet = -800
                    secondGroupScoreForThisSet = thisSetT.otherSideScore
                    thisSetT.didTheyGet = false
                }
                else {
                    firstGroupScoreForThisSet = 800
                    secondGroupScoreForThisSet = thisSetT.otherSideScore
                    thisSetT.didTheyGet = true
                }
            }
            // ---------------------------------------------------------
            else if (thisSetT.howMuchRead == "shelem") {
                if (thisSetT.otherSideScore > 0) {
                    firstGroupScoreForThisSet = -400
                    secondGroupScoreForThisSet = thisSetT.otherSideScore
                    thisSetT.didTheyGet = false

                }
                else {
                    firstGroupScoreForThisSet = 400
                    secondGroupScoreForThisSet = thisSetT.otherSideScore
                    thisSetT.didTheyGet = true

                }
            }
            else {
                var scoreHasGet = 200 - thisSetT.otherSideScore
                if (scoreHasGet >= thisSetT.howMuchRead) {
                    thisSetT.didTheyGet = true
                    firstGroupScoreForThisSet = scoreHasGet
                    secondGroupScoreForThisSet = thisSetT.otherSideScore
                }
                else {
                    thisSetT.didTheyGet = false
                    firstGroupScoreForThisSet = -thisSetT.howMuchRead
                    secondGroupScoreForThisSet = thisSetT.otherSideScore
                }
            }
        }
        // =========================================================
        // Scond Group Logic
        if (thisSetT.whichGroupRead.index == 2) {
            if (thisSetT.shelem && thisSetT.howMuchRead != "dubbleShelem" && thisSetT.howMuchRead != "shelem") {
                secondGroupScoreForThisSet = thisSetT.howMuchRead * 2
                thisSetT.didTheyGet = true
            }
            // ---------------------------------------------------------
            else if (thisSetT.dubblePostiveForOtherside) {
                firstGroupScoreForThisSet = thisSetT.otherSideScore * 2
                secondGroupScoreForThisSet = -thisSetT.howMuchRead
                thisSetT.didTheyGet = false

            }
            // ---------------------------------------------------------
            else if (thisSetT.dubbleNegative) {
                secondGroupScoreForThisSet = thisSetT.howMuchRead * -2
                firstGroupScoreForThisSet = thisSetT.otherSideScore
                thisSetT.didTheyGet = false
            }
            // ---------------------------------------------------------
            // =========================================================
            else if (thisSetT.howMuchRead == "dubbleShelem") {
                if (thisSetT.otherSideScore > 0) {
                    secondGroupScoreForThisSet = -800
                    firstGroupScoreForThisSet = thisSetT.otherSideScore
                    thisSetT.didTheyGet = false


                }
                else {
                    secondGroupScoreForThisSet = 800
                    firstGroupScoreForThisSet = thisSetT.otherSideScore
                    thisSetT.didTheyGet = true


                }
            }
            // ---------------------------------------------------------
            else if (thisSetT.howMuchRead == "shelem") {
                if (thisSetT.otherSideScore > 0) {
                    secondGroupScoreForThisSet = -400
                    firstGroupScoreForThisSet = thisSetT.otherSideScore
                    thisSetT.didTheyGet = false
                }
                else {
                    secondGroupScoreForThisSet = 400
                    firstGroupScoreForThisSet = thisSetT.otherSideScore
                    thisSetT.didTheyGet = true
                }
            }
            else {
                var scoreHasGet = 200 - thisSetT.otherSideScore
                if (scoreHasGet >= thisSetT.howMuchRead) {
                    thisSetT.didTheyGet = true
                    secondGroupScoreForThisSet = scoreHasGet
                    firstGroupScoreForThisSet = thisSetT.otherSideScore
                }
                else {
                    thisSetT.didTheyGet = false
                    secondGroupScoreForThisSet = -thisSetT.howMuchRead
                    firstGroupScoreForThisSet = thisSetT.otherSideScore
                }
            }
        }
        // =========================================================
        // =========================================================
        // =========================================================
        let NewSetRowTableHtml = `
            <tr>
            <td>${setNumber}</td>
            <td class='
            ${thisSetT.whichGroupRead.index == 1 && thisSetT.didTheyGet ? '!text-purple-600' :
                thisSetT.whichGroupRead.index == 1 && !thisSetT.didTheyGet ? '!text-red-500' :
                    thisSetT.whichGroupRead.index == 2 && thisSetT.didTheyGet ? '!text-black' :
                        thisSetT.whichGroupRead.index == 2 && !thisSetT.didTheyGet ? '!text-purple-600' : null
            }'>${firstGroupScoreForThisSet}</td>

            <td class='
            ${thisSetT.whichGroupRead.index == 1 && thisSetT.didTheyGet ? '!text-black' :
                thisSetT.whichGroupRead.index == 1 && !thisSetT.didTheyGet ? '!text-purple-600' :
                    thisSetT.whichGroupRead.index == 2 && thisSetT.didTheyGet ? '!text-purple-600' :
                        thisSetT.whichGroupRead.index == 2 && !thisSetT.didTheyGet ? '!text-red-500' : null
            }'>${secondGroupScoreForThisSet}</td>

            <td class='${!thisSetT.didTheyGet ? '!text-red-500' : "!text-purple-600"}'>${thisSetT.whoRead} :
             ${thisSetT.howMuchRead == "dubbleShelem" ? "شلم*2" :
                thisSetT.howMuchRead == "shelem" ? "شلم" :
                    thisSetT.howMuchRead
            }
             </td>
            <td><span class='text-red-500 fa fa-close'><span></td>
          </tr>
        `
        $("#tbody").append(NewSetRowTableHtml)
    }

    const AddToTabelCheat = (Cheating_optionsT) => {
        var firstGroupScoreForThisSet = 0
        var secondGroupScoreForThisSet = 0
        if (Cheating_optionsT.to == firstGroup.name) {
            if (Cheating_optionsT.signed == "pos") {
                secondGroupScoreForThisSet = Cheating_optionsT.amount
            }
            else if (Cheating_optionsT.signed == "neg") {
                firstGroupScoreForThisSet = -Cheating_optionsT.amount
            }
        }
        // -------------------------------------------------------
        if (Cheating_optionsT.to == secondGroup.name) {
            if (Cheating_optionsT.signed == "pos") {
                firstGroupScoreForThisSet = Cheating_optionsT.amount
            }
            else if (Cheating_optionsT.signed == "neg") {
                secondGroupScoreForThisSet = -Cheating_optionsT.amount
            }
        }
        // -------------------------------------------------------
        var newcheatSetHtml = `
         <tr>
          <td> ${'*'} </td>
          <td class="
          ${firstGroupScoreForThisSet > 0 ? 'text-green-500' : 'text-red-500'}
          "> ${firstGroupScoreForThisSet}</td>
          <td class="
          ${secondGroupScoreForThisSet > 0 ? 'text-green-500' : 'text-red-500'}
          ">${secondGroupScoreForThisSet}</td>
          <td class=" text-red-500"> تقلب </td>
          <td  bg-red-500 text-black"><span class='fa fa-close'></span></td>
        </tr>
        `
        $("#tbody").append(newcheatSetHtml)

    }


})