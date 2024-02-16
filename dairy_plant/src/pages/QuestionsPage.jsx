import React, { useState } from "react";
import './../styles/questionsPage.css'
import Footer from "../components/Footer";

const QuestionsPage = () => {
    return ( 
        <>
        <div className="question-container">
            <div className="accordion" id="accordionFlushExample">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                    Как добавить новую продукцию на склад?
                    </button>
                    </h2>
                    <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body">Чтобы добавить новую продукцию на склад, войдите в систему, перейдите на страницу учета продукции и заполните соответствующие поля, такие как наименование продукта, количество и дату поступления. После заполнения данных нажмите кнопку "Добавить" или "Сохранить", чтобы записать информацию о продукции на склад.</div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                    Как найти определенную продукцию на складе?
                    </button>
                    </h2>
                    <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body">Для поиска определенной продукции на складе перейдите на страницу поиска продукции. Введите критерии поиска, такие как наименование продукта, дата поступления или другие характеристики, и нажмите кнопку "Поиск". Результаты поиска покажут все записи, соответствующие заданным критериям.</div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                    Какие дополнительные услуги или программы вы предлагаете?
                    </button>
                    </h2>
                    <div id="flush-collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body">Никаких</div>
                    </div>
                </div>

            </div>
        </div>

        <Footer/>
        </>
     );
}
 
export default QuestionsPage;