const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 8080;

// Exporting Model
require("./Models/Dna");
const Dna = mongoose.model('dna');


// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/dna', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => {
    console.log("Conexão com MongoDB realizada com sucesso!")
}).catch((erro) => {
    console.log("Conexão com MongoDB NÃO foi realizada!")
});

app.use(express.json());

app.post("/simian", async (req, res) => {

    let result = isSimian(req.body);
    let dnaExists = await Dna.findOne({dna: result.dna});

    if (dnaExists != null) {

        return res.status(400).json({
            'msg': 'DNA já existe'
        });

    } else if(result.form_life === 's') {

        const dna = Dna.create(result, (err) => {
            if(err) {
                return 'DNA não foi cadastrado com sucesso!';
            }
            return  res.status(200).json({
                'msg': true
            });
        });
    } else if(result.form_life === 'h') { 

        const dna = Dna.create(result, (err) => {
            if(err) {
                return 'DNA não foi cadastrado com sucesso!';
            }
            return res.status(403).json({
                'msg': false
            });
        });
    } else {
        return res.status(400).json({
            'msg':result
        });
    }

});


app.get("/stats", (req,res) => {
    Dna.find({}).then((dna) => {
        let count_mutant_dna = 0;
        let count_human_dna = 0;
        for (i = 0; i < dna.length; i++) {
            if(dna[i].form_life == 's') {
                count_mutant_dna++
            } else if(dna[i].form_life == 'h') {
                count_human_dna++
            }
        }
        
        return res.status(200).json({count_mutant_dna, count_human_dna, ratio: (count_mutant_dna/count_human_dna) });
    })
});


function isSimian(request) {
    let linha = request.dna[0].length;
    let coluna = request.dna.length;
    
    if (linha != 6 || coluna != 6) {
        return 'Error: Invalid format';

    } else {
        let simian = false;
        horizontal = vertical = diagonal = 0;
        matriz = [];

        var tam = linha;
        // Create matriz
        for(i = 0; i < tam; i++) {
            matriz[i] = request.dna[i].split("")
        }

        // Verify line
        for (lin = 0; lin < tam; lin++){
            horizontal = 0;
            for (col = 0; col < tam; col++){
                base = matriz[lin][col];
                if (base == matriz[lin][col+1]) {
                    horizontal++
                }
            }
            if(horizontal >= 3) {
                simian = true
            }
        }

        // Verify column
        for (col = 0; col < tam; col++){
            vertical = 0;
            for (lin = 0; lin < tam; lin++){
                base = matriz[lin][col];
                if (!(lin+1 == tam)) {
                if (base == matriz[lin+1][col]) {
                    vertical++
                    }
                }
            }
            if(vertical >= 3) {
                simian = true
            }
        }

        // Verify diagonal
        for (k = 0; k <= 2 * (tam - 1); ++k) {
            temp = []
            for (lin = coluna - 1; lin >= 0; --lin) {
                col = k - lin;
                if (col >= 0 && col < linha) {
                    temp.push(matriz[lin][col])
                }
            }

            if(temp.length >= 4) {
                diagonal = 0
                for (i = 0 ; i < temp.length; i++) {
                    
                    if(temp[i] == temp[i + 1]){
                        diagonal++
                    } else if (diagonal >= 3){
                        simian = true
                    } else {
                        diagonal = 0
                    }

                }
                if (diagonal >= 3){
                    simian = true
                }
            }
        }

        console.log(matriz)
        if(simian == true) {
            let dnaSimian = matriz.join('');
            let result = {
                "dna"       : dnaSimian,
                'form_life' : 's'
            }
            
            return result;
        } else {
            let dnaHuman = matriz.join('');
            let result = {
                "dna"       : dnaHuman,
                'form_life' : 'h'
            }
            return result;
        }
    }
};

app.listen(port, () => {
    console.log('Servidor iniciado na porta ' + port);
})