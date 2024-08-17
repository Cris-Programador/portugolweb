package br.erickweil.portugolweb;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.Uri;

import java.util.Random;

public class JanelaHelper {
    public static void AbrirJanelaAplicativoDesatualizado(final Context context,String versaoApp, String respVersion) {
        AlertDialog.Builder builder = new AlertDialog.Builder(context);
        builder.setTitle(R.string.app_name);
        builder.setMessage("Foi detectado que seu aplicativo está desatualizado, é altamente recomendado que você atualize o aplicativo\n*Salve seu trabalho* antes de atualizar\n A versão mais recente é "+respVersion+" e você ainda está na "+versaoApp);
        builder.setIcon(R.drawable.ic_launcher_foreground);
        builder.setPositiveButton("Atualizar", new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int id) {
                dialog.dismiss();
                abirAppNaLoja(context);
            }
        });
        builder.setNegativeButton("Continuar Desatualizado", new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int id) {
                dialog.dismiss();
            }
        });
        AlertDialog alert = builder.create();
        alert.show();
    }

    public static void abirAppNaLoja(final Context ctx)
    {
        final String appPackageName = ctx.getPackageName(); // getPackageName() from Context or Activity object
        try {
            ctx.startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse("market://details?id=" + appPackageName)));
        } catch (android.content.ActivityNotFoundException anfe) {
            ctx.startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse("https://play.google.com/store/apps/details?id=" + appPackageName)));
        }
    }

    public static void AbrirJanelaDarNota(final Context context) {
        AlertDialog.Builder builder = new AlertDialog.Builder(context);
        builder.setTitle(R.string.app_name);
        Random random = new Random();
        int messageN = random.nextInt(10);
        switch(messageN) {
            case 0: builder.setMessage("Gostaria de sugerir algo? Faça isso no projeto no Github."); break;
            case 1: builder.setMessage("Você é um professor? Contribua com o projeto no Github"); break;
            case 2: builder.setMessage("Encontrou um problema? Você deveria relatar para que seja resolvido, por meio de uma issue no Github"); break;
            case 3: builder.setMessage("Tem uma ideia de melhoria? Contribua com o projeto no Github"); break;
            case 4: builder.setMessage("Sabia que este APP é Open Source? Veja todo o código no Github"); break;
            case 5: builder.setMessage("Se você clicar no botão 'Dar uma Nota' esse pop-up irá parar de ser exibido"); break;
            default: builder.setMessage("Está gostando do App? Considere Avaliá-lo na Play Store."); break;
        }
        builder.setIcon(R.drawable.ic_launcher_foreground);
        if(messageN < 5) {
            builder.setPositiveButton("Abrir projeto", new DialogInterface.OnClickListener() {
                public void onClick(DialogInterface dialog, int id) {
                    dialog.dismiss();

                    try {
                        Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse("https://github.com/erickweil/portugolweb"));
                        context.startActivity(browserIntent);
                    }
                    catch (Exception e)
                    {
                        e.printStackTrace();
                    }
                }
            });
        } else {
            builder.setPositiveButton("Dar uma Nota", new DialogInterface.OnClickListener() {
                public void onClick(DialogInterface dialog, int id) {
                    dialog.dismiss();

                    try {
                        SharedPreferences preferences = Inicio.getPrefs(context);
                        int deuNota = preferences.getInt("deu_nota", 0);
                        SharedPreferences.Editor prefsEdit = preferences.edit();
                        prefsEdit.putInt("deu_nota", deuNota + 1);
                        prefsEdit.apply();// commit??
                    } catch (Exception e) {
                        e.printStackTrace();
                    }

                    abirAppNaLoja(context);
                }
            });
        }
        builder.setNegativeButton("Depois", new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int id) {
                dialog.dismiss();
            }
        });
        AlertDialog alert = builder.create();
        alert.show();
    }

    public static void abrirJanelaAtualizaoComSucesso(final Activity context, int versaoAntiga, int versaoAtual) {
        AlertDialog.Builder builder = new AlertDialog.Builder(context);
        builder.setTitle(R.string.app_name);
        builder.setMessage("O Site do aplicativo atualizou para a versão "+versaoAtual+" (Você estava na "+versaoAntiga+"). Download da versão nova concluído.\n *Salve seu trabalho* e reinicie o aplicativo para ter efeito.");
        builder.setIcon(R.drawable.ic_launcher_foreground);
        builder.setPositiveButton("Reiniciar", new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int id) {
                dialog.dismiss();

                // Recomeça a Activity para recarregar o webview com o url correto
                context.recreate();
            }
        });
        builder.setNegativeButton("Depois", new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int id) {
                dialog.dismiss();
            }
        });

        AlertDialog alert = builder.create();
        alert.show();
    }
}
