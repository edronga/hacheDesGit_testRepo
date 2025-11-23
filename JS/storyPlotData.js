'use strict'

const chapter1Plot = [
    {
        character: 'protagonist',
        text: `La journée s'annonce tranquille.`
    },
    {
        character: 'narrator',
        text: `Notre protagoniste, infirmière coordinatrice en oncologie, était assez insouciante. Elle devrait savoir que le calme cachait souvent une tempête. Ou pire.`
    },
    {
        character: 'protagonist',
        text: `J'espère que quelqu'un a réparé la machine à café.`
    },
    {
        character: 'narrator',
        text: `Soudain la directrice de l'hôpital fit irruption dans son bureau.Sans dire bonjour`
    },
    {
        character: 'directrice',
        text:`Je suis venu vous dire qu'on va vous remplacer par un logiciel qui fait votre travail. Mais en mieux. En plus vite. Et en moins cher.`
    },
    {
        character: 'protagonist',
        text:`Une intelligence artificielle de pointe ? Comme ChaptGPT ?`
    },
    {
        character: 'directrice',
        text:`Non c'est ce qu'on voulait, mais on n'avait pas le budget.
            <br>A la place, c'est un logiciel developpé par Justine, ma filleule de 11 ans, sur sa calculatrice de poche. Il s'appelle "loIo"`
    },
    {
        character: 'narrator',
        text:`La protagoniste ressentit un petit frisson.`
    },
    {
        character: 'directrice',
        text:`Donc voilà le défi : vous faites le planning du jour. loIo aussi. Si vous perdez, vous êtes virée. Si vous égalisez, on fera peut-être un second test avant de vous virer.
        <br> Si vous gagnez, euh... ce serait étonnant mais on verra.`
        }
]

const chapter3Plot = [
    {
        character:'narrator',
        text:`Le jour de la confrontation finale était arrivé. L'air sentait la tension… et le café brûlé.`
    },
    {
        character:'directrice',
        text:`C'est le dernier test. Aujourd'hui, nous saurons si un humain peut encore battre une machine.`
    },
    {
        character:'narrator',
        text:`Justine apparut dans l'entrebaillure de la porte, calculatrice à la la main.`
    },
    {
        character:'Justine',
        text:`loIo est en mode « performance maximale ». J'ai enlevé les limites de sécurité.`
    },
    {
        character:'protagonist',
        text:`Pardon ?`
    },
    {
        character:'Justine',
        text:`Il peut maintenant résoudre des équations, optimiser des plannings, et peut-être faire du café. Si on survit.`
    },
    {
        character:'narrator',
        text:`La protagoniste s'installa, inspira profondément.<br>La calculatrice de Justine se mit à vibrer.`
    },
    {
        character:'loIo',
        text:`Chargement du protocole final. Prêt à écraser l'humanité du planning.`
    },
    {
        character:'narrator',
        text:`Il était l'heure du duel final`
        }
]

const chapter2Plot = [
    [
    {
        character:'narrator',
        text:`Une coupure de courant plongea l'hôpital dans le noir. loIo redémarra en mode « Jeu Vidéo 1998 ».`
    },
    {
        character:'protagonist',
        text:`Super. Je vais me battre contre un Tamagotchi.`
    },
    {
        character:'Justine',
        text:`Attention ! En mode rétro, loIo est *très* fort.`
    },
    {
        character:'Directrice de l\'hôpital',
        text:`S'il me bat même sans électricité, vous êtes vraiment virée.`
    },
    {
        character:'loIo',
        text:`Bip bop. Planning imminent.`
        }
    ]
    /*,

    [
    {
        character:'narrator',
        text:`Un patient arriva avec 4h30 d'avance. On soupçonnait qu'il dormait dans le parking.`
    },
    {
        character:'protagonist',
        text:`On ne fait pas les chimios en avance…`
    },
    {
        character:'Justine',
        text:`loIo propose de l'utiliser comme décoration vivante.`
    },
    {
        character:'Directrice',
        text:`Inhumain, mais efficient.`
    },
    {
        character:'loIo',
        text:`Placer patient précoce dans case "fantôme".`
        }
    ],

    [

        {
        character:'narrator',
        text:`Le chat de l'hôpital s'était incrusté dans un secteur, déclenchant une allergie collective.`
    },
    {
        character:'protagonist',
        text:`Qui a encore laissé la porte ouverte ?`
    },
    {
        character:'Justine',
        text:`loIo a ajouté le chat comme "patient prioritaire".`
    },
    {
        character:'Directrice',
        text:`Laissez-le faire. Il est peut-être meilleur que vous.`
    },
    {
        character:'loIo',
        text:`Miaulement détecté. Optimisation féline.`
        }
    ],

    [
{
        character:'narrator',
        text:`Les fauteuils roulants autonomes avaient décidé de se mutiner et se promenaient partout en klaxonnant l'hymne de l'hôpital.`
    },
    {
        character:'protagonist',
        text:`C'était une mauvaise idée de leur mettre une IA Bluetooth…`
    },
    {
        character:'Justine',
        text:`loIo propose une danse synchronisée pour les calmer.`
    },
    {
        character:'Directrice',
        text:`J'autorise. Si ça marche. Sinon, je l'interdis.`
    },
    {
        character:'loIo',
        text:`Calcul de chorégraphie en cours…`
    },
    {
        character:'narrator',
        text:`Une nouvelle confrontation entre la protagoniste et loIo fut annoncée.`
        }
    ],

    [
        {
        character:'narrator',
        text:`Un patient décida de faire des claquettes dans tous les secteurs pour “augmenter le moral du service”.`
    },
    {
        character:'protagonist',
        text:`J'en peux plus.`
    },
    {
        character:'Directrice',
        text:`Il claque très bien. Mais ça perturbe les perfusions.`
    },
    {
        character:'Justine',
        text:`loIo propose d'utiliser les claquettes pour marquer les temps de passage entre les secteurs.`
    },
    {
        character:'loIo',
        text:`Rythme optimal détecté : TAP TAP *CLING*.`
    },
    {
        character:'narrator',
        text:`Puis, la nouvelle confrontation fut annoncée.`
        }

    ],

    [
        {
        character:'narrator',
        text:`Un patient avait tellement de retard qu'il était techniquement… en avance sur le planning du lendemain.`
    },
    {
        character:'protagonist',
        text:`Non. Non. Non. La physique ne marche pas comme ça.`
    },
    {
        character:'Justine',
        text:`loIo dit que si.`
    },
    {
        character:'Directrice',
        text:`Alors c'est que si.`
    },
    {
        character:'loIo',
        text:`Synchronisation temporelle en cours. Merci de patienter hier.`
    },
    {
        character:'narrator',
        text:`En toute logique absurde, une nouvelle confrontation fut annoncée.`
        }
    ],

    [

        {
        character:'narrator',
        text:`Un patient arriva en ne parlant qu'en rébus. Absolument tout en rébus. Même son nom. Il ressemblait à un escape game humain.`
    },
    {
        character:'protagonist',
        text:`Je comprends pas si sa chimio doit être à 10h… ou si c'est une girafe qui mange du pudding.`
    },
    {
        character:'Justine',
        text:`loIo traduit pour vous : « 10h » et « pudding facultatif ».`
    },
    {
        character:'Directrice',
        text:`Très bien. Continuez.`
    },
    {
        character:'loIo',
        text:`🔍➡️💉 = Rendez-vous accepté.`
    },
    {
        character:'narrator',
        text:`Une nouvelle confrontation entre la protagoniste et loIo fut ensuite annoncée.`
        }
    ],

    [
        {
        character:'narrator',
        text:`Un médecin avait décidé d'ajouter des patients par pure joie de vivre. Trop de joie de vivre. Beaucoup trop.`
    },
    {
        character:'protagonist',
        text:`Il faut lui enlever le café. Immédiatement.`
    },
    {
        character:'Justine',
        text:`loIo vient de générer un protocole d'urgence : "Médecin en surchauffe émotionnelle".`
    },
    {
        character:'Directrice',
        text:`Ça me semble juste.`
    },
    {
        character:'loIo',
        text:`Optimisation en cours. Café retiré du personnel.`
    },
    {
        character:'narrator',
        text:`On annonça ensuite une nouvelle confrontation entre la protagoniste et loIo.`
        }
    ],

    [

        {
        character:'narrator',
        text:`Le chat de l'hôpital avait évolué. Littéralement. Il tenait désormais un badge et supervisait lui-même les entrées des patients.`
    },
    {
        character:'protagonist',
        text:`Pourquoi le chat a un badge ??`
    },
    {
        character:'Directrice',
        text:`Il a passé la formation.`
    },
    {
        character:'Justine',
        text:`loIo vient de lui accorder le rôle de “gestionnaire félin adjoint”.`
    },
    {
        character:'loIo',
        text:`Miaou validé.`
    },
    {
        character:'narrator',
        text:`Comme toujours, une nouvelle confrontation fut annoncée.`
        }
    ],

    [
        {
        character:'narrator',
        text:`Un fantôme errait dans le service. Il ne faisait pas peur, mais il déplaçait les dossiers classés par ordre alphabétique en ordre “j'ai décidé ça comme ça”.`
    },
    {
        character:'protagonist',
        text:`J'en ai marre. Je vais appeler un exorciste. Ou un archiviste.`
    },
    {
        character:'Justine',
        text:`loIo dit que le fantôme a un master en désorganisation.`
    },
    {
        character:'Directrice',
        text:`Engageons-le pas.`
    },
    {
        character:'loIo',
        text:`Interaction spectrale optimisée.`
    },
    {
        character:'narrator',
        text:`Puis fut annoncée une nouvelle confrontation entre la protagoniste et loIo.`
        }
    ],

    [

         {
        character:'narrator',
        text:`Un patient refusait d'entrer dans son secteur car “Mercure était en rétrograde”. La protagoniste, elle, était en rétrograde depuis 2014.`
    },
    {
        character:'protagonist',
        text:`J'ai besoin de vacances. Ou d'un shot d'adrénaline. Ou d'un trou noir.`
    },
    {
        character:'narrator',
        text:`Elle inspira. Elle avait ce talent rare : gérer une crise tout en remettant en question ses choix de vie.`
    },
    {
        character:'Justine',
        text:`loIo dit que votre niveau de fatigue émotionnelle est “statistiquement impressionnant”.`
    },
    {
        character:'Directrice',
        text:`Mais non, vous êtes très bien comme outil humain.`
    },
    {
        character:'narrator',
        text:`On annonça alors une nouvelle confrontation entre la protagoniste et loIo.`
        }
    ],

    [
        
    {
        character:'narrator',
        text:`Un fauteuil roulant autonome entra dans le bureau de la directrice en klaxonnant. Elle ne sursauta pas : elle comptait de l'argent, mentalement.`
    },
    {
        character:'Directrice',
        text:`Chaque klaxon coûte de l'électricité. Qui paie l'électricité ? Pas le fauteuil.`
    },
    {
        character:'protagonist',
        text:`Vous pensez… en euros ? En tout temps ?`
    },
    {
        character:'narrator',
        text:`Elle hocha la tête. Même ses rêves avaient une trésorerie.`
    },
    {
        character:'Justine',
        text:`loIo propose un plan d'économie basé sur la disparition du fauteuil.`
    },
    {
        character:'narrator',
        text:`Une nouvelle confrontation entre la protagoniste et loIo fut annoncée.`
        }

    ],

    [
        {
        character:'narrator',
        text:`Le secteur 7 avait disparu. Littéralement. Justine examina la zone vide avec un calme inquiétant.`
    },
    {
        character:'Justine',
        text:`Ça me rappelle quand j'ai failli aller en Corse. Tout avait disparu ce jour-là aussi.`
    },
    {
        character:'protagonist',
        text:`Tu… veux en parler ?`
    },
    {
        character:'Justine',
        text:`Non. Surtout pas. On ne sait jamais, si la Corse écoute…`
    },
    {
        character:'Directrice',
        text:`Bref ! Optimisez ! Ou partez en Corse ! (Justine hurla intérieurement.)`
    },
    {
        character:'narrator',
        text:`Une nouvelle confrontation entre la protagoniste et loIo fut annoncée.`
        }
    ],

    [
        {
        character:'narrator',
        text:`Le médecin trop enthousiaste avait ajouté des patients “pour la beauté du geste”. Justine observait la scène, fascinée par ce concept étrange : l'enthousiasme.`
    },
    {
        character:'Justine',
        text:`Il… aime vraiment son travail ? Il doit être étudié.`
    },
    {
        character:'protagonist',
        text:`C'est juste un médecin trop motivé.`
    },
    {
        character:'Justine',
        text:`Ou un mutant émotionnel. Je prends des notes.`
    },
    {
        character:'loIo',
        text:`Analyse : anomalie humaine détectée.`
    },
    {
        character:'narrator',
        text:`Puis une nouvelle confrontation entre la protagoniste et loIo fut annoncée.`
        }
    ],

    [

        {
        character:'narrator',
        text:`Le chat de l'hôpital supervisait désormais les patients. La directrice lui parla comme à un cadre. Trop naturellement.`
    },
    {
        character:'Directrice',
        text:`Faites-moi un rapport avant midi. Et pas de poils sur les dossiers, merci.`
    },
    {
        character:'narrator',
        text:`loIo analysa le chat avec suspicion. Ceux qui réussissaient trop bien l'agaçaient.`
    },
    {
        character:'loIo',
        text:`Qui est ce rival moustachu ?`
    },
    {
        character:'Justine',
        text:`C'est un chat, loIo. Pas un concurrent.`
    },
    {
        character:'narrator',
        text:`Puis fut annoncée une nouvelle confrontation entre la protagoniste et loIo.`
    }
    ]
    */

]

const chapter1Conclusion = {
    hasBeaten: 
    [{
        character:'narrator',
        text:`La directrice semblait dépitée. loIo clignota, affichant « ERREUR 404 : DIGNITÉ NON TROUVÉE ». La protagoniste savourait sa victoire.`
    }
    ],
    hasEqualized: 
    [{
        character:'narrator',
        text:`La directrice haussa un sourcil. loIo clignota : « OPTIMISATION ACCEPTABLE MAIS DÉCEVANTE ». Un second test serait nécessaire.`
    }
    ],
    hasTried: 
    [{
        character:'narrator',
        text:`loIo afficha un petit smiley supérieur. La directrice esquissa un sourire. La protagoniste comprit qu'elle allait devoir se battre pour garder son poste.`   
    }
    ]
}

const chapter2Conclusion = {
    hasBeaten: 
    [{
        character:'narrator',
        text:`loIo clignota d'un air vexé. La directrice feignit de sourire mais on sentait la déception. Justine nota quelque chose : probablement une mise à jour. La protagoniste gagnait du terrain.`
    }
    ],
    hasEqualized: 
    [{
        character:'narrator',
        text:`loIo bippa, acceptant un match nul. La directrice hésitait entre félicitations et licenciement. Justine semblait ravie : elle aimait les duels.`
    }
    ],
    hasTried: 
    [{
        character:'narrator',
        text:`loIo afficha « JE SUIS LE FUTUR ». La directrice applaudit. Justine resta neutre, comme si elle s'y attendait. Le prochain round serait décisif.`    
    }
    ]
    
}

const chapter3Conclusion = {
    hasBeaten: 
    [{
        character:'narrator',
        text:`***`
    }
    ],
    hasEqualized: 
    [{
        character:'narrator',
        text:`***`
    }
    ],
    hasTried: 
    [{
        character:'narrator',
        text:`***`    
    }
    ]
    
}
