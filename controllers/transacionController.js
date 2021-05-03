const transactionModel = require('../models/TransactionModel');
var ObjectId = require('mongodb').ObjectID;


var transactionController = {

    /**
     * transactionController.list()
     */
    list: function (req, res) {
        var period = req.params.period;

        if (period == null) {
            return res.status(400).json({
                message: 'É necessário informar o parametro \"period\", cujo valor deve estar no formato yyy-mm'
            });           
        }      

        
        transactionModel.find({yearMonth: period}, function (err, transação) {
            if (err) {
                return res.status(500).json({
                    message: 'Erro ao tentar localizar as transações!',
                    error: err
                });            
            }            

            return res.json(transação);
        });
    },

    /**
     * transactionController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        transactionModel.findOne({_id: new ObjectId(id)}, function (err, transacao) {
            if (err) {
                return res.status(500).json({
                    message: 'Erro ao localizar a transação!',
                    error: err
                });
            }

            if (transacao == null) {
                return res.status(404).json({
                    message: 'transação não localizada!'
                });
            }

            return res.json(transacao);
        });
    },
    

    /**
     * transactionController.create()
     */
    create: function (req, res) {
        var transacao = new transactionModel({
            description: req.body.description ,
            value: req.body.value,
            category: req.body.category,
            year: req.body.year,
            month: req.body.month ,
            day: req.body.day,
            yearMonth: req.body.yearMonth ,
            yearMonthDay: req.body.yearMonthDay ,
            type: req.body.type ,
          });
         
          
          transacao.save(function (err, result) {            
                if (err) {
                    return res.status(500).json({
                        message: `Erro ao criar a transação: {transacao.name}`,
                        error: err
                    });
                }           
            return res.status(201).json(result);  
          });

           
    },

    /**
     * transactionController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        transactionModel.findOne({_id: id}, function (err, transacao) {
            if (err) {
                return res.status(500).json({
                    message: 'Erro ao tentar localizar a transação.',
                    error: err
                });
            }

            if (!transacao) {
                return res.status(404).json({
                    message: 'transação não localizada!'
                });
            }

            transacao.id = id;
            transacao.description = req.body.description ? req.body.description : transacao.description;
			transacao.value = req.body.value ? req.body.value : transacao.value;
			transacao.category = req.body.category ? req.body.category : transacao.category;
			transacao.year = req.body.year ? req.body.year : transacao.year;
			transacao.month = req.body.month ? req.body.month : transacao.month;
            transacao.day = req.body.day ? req.body.day : transacao.day;
            transacao.yearMonth = req.body.yearMonth ? req.body.yearMonth : transacao.yearMonth;
            transacao.yearMonthDay = req.body.yearMonthDay ? req.body.yearMonthDay : transacao.yearMonthDay;
            transacao.type = req.body.type ? req.body.type : transacao.type;
			

            transactionModel.updateOne({"_id": transacao.id}, {$set: transacao },
            function (err,  transacao) {
                if (err) {
                    return res.status(500).json({
                        message: 'Erro ao tentar atualizar a transação.',
                        error: err
                    });
                };

                return res.json(transacao);
            });
        });
    },

    /**
     * transactionController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        transactionModel.findOneAndRemove({_id: new ObjectId(id)}, function (err, transacao) {
            if (err) {
                return res.status(500).json({
                    message: 'Error ao tentar excluir a transação.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};


module.exports = transactionController;

